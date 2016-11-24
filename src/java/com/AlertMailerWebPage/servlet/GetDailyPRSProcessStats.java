/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.AlertMailerWebPage.servlet;

import com.mongodb.BasicDBObject;
import com.mongodb.Block;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.ServerAddress;
import com.mongodb.client.AggregateIterable;
import java.awt.List;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import static java.util.Arrays.asList;
import java.util.Calendar;
import java.util.Properties;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.bson.Document;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author prakharagarwal
 */
public class GetDailyPRSProcessStats extends HttpServlet {

        ArrayList<Integer> list = new ArrayList<Integer>();
        
           
          
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
        response.setContentType("text/plain;charset=UTF-8");
        
        try (PrintWriter out = response.getWriter()) {
            
          
            Properties defaultProps = new Properties();
            InputStream in = GetProcessSpeed.class.getResourceAsStream("configuration.properties");
                defaultProps.load(in);
            in.close();
            String database=(String)defaultProps.get("database_PRSProcessStats");
            String collection=(String)defaultProps.get("collection_PRSProcessStats");
            String serverAddress=(String)defaultProps.get("IP_AlertsProcess");
            
final JSONArray counts1= new JSONArray();
final JSONArray counts2= new JSONArray();
final JSONArray counts3= new JSONArray();
//AggregateIterable<Document> counts_PRS_daily=getCounts("AlertsProcess","PRSProcessStats","daily");
AggregateIterable<Document> counts_PRS_daily=getCounts(database,collection,serverAddress,"daily");
AggregateIterable<Document> counts_PRS_weekly=getCounts(database,collection,serverAddress,"weekly");
AggregateIterable<Document> counts_PRS_monthly=getCounts(database,collection,serverAddress,"monthly");

        counts_PRS_daily.forEach(new Block<Document>() {
            @Override
            public void apply(final Document document) {
                String errorcode=(String)document.get("_id");
                int count1=(int) document.get("count");
                JSONObject counts= new JSONObject();
                try{
                    counts.put(errorcode,count1);
                    counts1.put(counts);
                }catch(Exception e){

                }

            }
            });
        counts_PRS_weekly.forEach(new Block<Document>() {
            @Override
            public void apply(final Document document) {
                String errorcode=(String)document.get("_id");
                int count1=(int) document.get("count");
                JSONObject counts= new JSONObject();
                try{
                    counts.put(errorcode,count1);
                    counts2.put(counts);
                }catch(Exception e){

                }

            }
            });
        counts_PRS_monthly.forEach(new Block<Document>() {
            @Override
            public void apply(final Document document) {
                String errorcode=(String)document.get("_id");
                int count1=(int) document.get("count");
                JSONObject counts= new JSONObject();
                try{
                    counts.put(errorcode,count1);
                    counts3.put(counts);
                }catch(Exception e){

                }

            }
            });

            JSONObject counts4=new JSONObject();
            try{
                counts4.put("today",counts1);
                counts4.put("weekly",counts2);
                counts4.put("monthly",counts3);
            }catch(Exception e){

            }
       
    response.setContentType("text/plain");
    response.setCharacterEncoding("UTF-8");
  response.getWriter().write(counts4.toString());        
        }
        
       
    }
     public AggregateIterable<Document> getCounts( String database, String collection,String serverAddress,String time){
         Calendar current= Calendar.getInstance();
           //out.println( current.getTimeInMillis());
            int currYear=current.get(Calendar.YEAR);
            int currMonth=current.get(Calendar.MONTH);
            //currMonth=6;
            int currDay=current.get(Calendar.DAY_OF_MONTH);
            
            list.clear();
            
            Calendar curr_6AM=Calendar.getInstance();
            Calendar curr_24PM=Calendar.getInstance();
         if(time.equals("daily"))
         { 
            //Calendar curr_6AM=Calendar.getInstance();
            curr_6AM.set(currYear,6,7,0,0,1);
           // out.println(curr_6AM.getTimeInMillis());
            
             //Calendar curr_24PM=Calendar.getInstance();
            curr_24PM.set(currYear, 6, 7,23,59,59);
            //out.println(curr_9AM.getTimeInMillis());
         }else  if(time.equals("weekly")){
             
            curr_6AM.set(currYear, 6,7,0,0,1);
            curr_6AM.add(Calendar.DATE,-6);
            
            
             
            curr_24PM.set(currYear, 6, 7,23,59,59);
         }else if(time.equals("monthly")){
             
            curr_6AM.set(currYear, 6,7,0,0,1);
            curr_6AM.add(Calendar.DATE,-29);
            
            
             
            curr_24PM.set(currYear, 6, 7,23,59,59);
         }
            
            
            
            
                //MongoClient mongoClient = new MongoClient(new ServerAddress(serverAddress,27017));
                  MongoClient mongoClient = new MongoClient();
          //MongoClient mongoClient = new MongoClient();
AggregateIterable<Document> iterable_6_9_p = mongoClient.getDatabase(database).getCollection(collection).aggregate(asList(
        new Document("$match", new Document("date", new Document("$gte",Long.toString(curr_6AM.getTimeInMillis())).append("$lte", Long.toString(curr_24PM.getTimeInMillis())))
                //.append("alertType", alertType)                
                //.append("date", new Document("$gte",Long.toString(curr_6AM.getTimeInMillis())).append("$lt", Long.toString(curr_24PM.getTimeInMillis())))
        ),
        
        new Document("$group", new Document("_id","$errorCode").append("count", new Document("$sum", 1)))));



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
