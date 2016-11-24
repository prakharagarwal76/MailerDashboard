/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.AlertMailerWebPage.servlet;

import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.ServerAddress;
import com.mongodb.client.AggregateIterable;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import static java.util.Arrays.asList;
import java.util.Calendar;
import java.util.Properties;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.bson.Document;
import org.json.JSONObject;

/**
 *
 * @author prakharagarwal
 */
public class GetProcessSpeed extends HttpServlet {

    double countPRS=0;
    double countPSM=0;
    double countRENTAL=0;
    
    double countPRS_S=0;
    double countPSM_S=0;
    double countRENTAL_S=0;
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            Properties defaultProps = new Properties();
            InputStream in = GetProcessSpeed.class.getResourceAsStream("configuration.properties");
                defaultProps.load(in);
            in.close();
            String database=(String)defaultProps.get("database_requirementLog");
            String collection=(String)defaultProps.get("collection_requirementLog");
            String serverAddress=(String)defaultProps.get("IP_mbstats");

          AggregateIterable<Document> count_alert_S=getProcessSpeed(database,collection,serverAddress,"speed");
          
          
          AggregateIterable<Document> count_alert=getProcessSpeed(database,collection,serverAddress,"count");
          count_alert.forEach(new Block<Document>() {
    @Override
    public void apply(final Document document) {
        String type=(String)document.get("_id");
        if(type.equals("PRS")){
        countPRS=(int)document.get("count");
        }else if(type.equals("PSM")){
        countPSM=(int)document.get("count");
        }else if(type.equals("RENTAL")){
        countRENTAL=(int)document.get("count");
        }
        
    }
            });
          count_alert_S.forEach(new Block<Document>() {
    @Override
    public void apply(final Document document) {
        String type=(String)document.get("_id");
        if(type.equals("PRS")){
        countPRS_S=(int)document.get("count");
        countPRS_S=(countPRS_S/900); //for speed per sec
        countPRS_S=Math.round(countPRS_S*100.0)/100.0;
        }else if(type.equals("PSM")){
        countPSM_S=(int)document.get("count");
        countPSM_S=(countPSM_S/900); //for speed per sec
        countPSM_S=Math.round(countPSM_S*100.0)/100.0;
        }else if(type.equals("RENTAL")){
        countRENTAL_S=(int)document.get("count");
        countRENTAL_S=(countRENTAL_S/900); //for speed per sec
        countRENTAL_S=Math.round(countRENTAL_S*100.0)/100.0;
        }
        
    }
            });
          
          JSONObject json=new JSONObject();
          
          try{
              json.put("speedPRS",countPRS_S);
          json.put("speedPSM",countPSM_S);
          json.put("speedRENTAL",countRENTAL_S);
          json.put("countPRS",countPRS);
          json.put("countPSM",countPSM);
          json.put("countRENTAL",countRENTAL);
          }catch(Exception e){
              
          }
          response.setContentType("text/plain");
    response.setCharacterEncoding("UTF-8");
  response.getWriter().write(json.toString());
        }
    }
    public AggregateIterable<Document> getProcessSpeed(String database,String collection,String serverAddress,String req){
        
        Calendar current_min1= Calendar.getInstance();
        Calendar current=Calendar.getInstance();
        if(req.equals("count")){
         current= Calendar.getInstance();
                   int currYear=current.get(Calendar.YEAR);
            int currMonth=current.get(Calendar.MONTH);
            
            int currDay=current.get(Calendar.DAY_OF_MONTH);
            current_min1.set(currYear,6,4,0,0,0);
            current.set(currYear,6,4,23,59,59);
             
        }else if(req.equals("speed")){
            int currYear=current.get(Calendar.YEAR);
            int currMonth=current.get(Calendar.MONTH);
            
            int currDay=current.get(Calendar.DAY_OF_MONTH);
            current_min1.set(currYear,6,4,0,0,0);
            current.set(currYear,6,4,23,59,59);
            
                  
            
             
        }
           
            
             
               // MongoClient mongoClient = new MongoClient(new ServerAddress(serverAddress,27017));
        MongoClient mongoClient = new MongoClient();
AggregateIterable<Document> iterable_6_9_p = mongoClient.getDatabase(database).getCollection(collection).aggregate(asList(
        new Document("$match", new Document("isMailSent","Y")
                .append("$or",asList(new Document("alertType","PRS"),new Document("alertType","PSM"),new Document("alertType","RENTAL")))                
                .append("recordTime", new Document("$gte",current_min1.getTimeInMillis()).append("$lte", current.getTimeInMillis()))),
        new Document("$group", new Document("_id","$alertType").append("count", new Document("$sum", 1)))));

        return iterable_6_9_p;
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
