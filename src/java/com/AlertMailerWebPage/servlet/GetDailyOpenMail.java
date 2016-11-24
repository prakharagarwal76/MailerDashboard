package com.AlertMailerWebPage.servlet;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import static java.util.Arrays.asList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
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
public class GetDailyOpenMail extends HttpServlet {

       
      Map<Integer, Integer> prsMap = null;
       Map<Integer, Integer> psmMap = null;
       Map<Integer, Integer> rentalMap =null;
       
       
       
       
       int val=0;
       int i=0;
       String type=null;
           
          
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
             prsMap = getMapper();
         psmMap = getMapper();
         rentalMap =getMapper();
         
            
            Properties defaultProps = new Properties();
            InputStream in = GetProcessSpeed.class.getResourceAsStream("configuration.properties");
                defaultProps.load(in);
            in.close();
            String database=(String)defaultProps.get("database_mailOpenLog");
            String collection=(String)defaultProps.get("collection_mailOpenLog");
            String serverAddress=(String)defaultProps.get("IP_alertracker");
            
           String initial=request.getParameter("initial");
           //if(initial.equals("yes"))
           //{
            final JSONArray counts1= new JSONArray();
            final JSONArray counts2= new JSONArray();
            final JSONArray counts3= new JSONArray();
            
            
            
                JSONObject counts= new JSONObject();
                //AggregateIterable<Document> countsPRS=getCounts("PRS","alertracker","mailOpenLog");
               AggregateIterable<Document> counts_alert=getCounts(database,collection,serverAddress);
               
                
                counts_alert.forEach(new Block<Document>() {
                            @Override
                            public void apply(final Document document) {
                                Document doc1=(Document)document.get("_id");
                                int hour=(int)doc1.get("hour");
                                type=(String)doc1.get("type");
                                val=(int)document.get("count");
                                if(type.equalsIgnoreCase("PRS")){
                                	prsMap.put(hour, val);
                                }else if(type.equalsIgnoreCase("PSM")){
                                	psmMap.put(hour, val);
                                }else if(type.equalsIgnoreCase("RENTAL")){
                                	rentalMap.put(hour, val);
                                        
                                }
                            
                            }

                        });
                
              for(Map.Entry<Integer,Integer> map :prsMap.entrySet()){
                	counts1.put(map.getValue());
                }
                
                for(Map.Entry<Integer,Integer> map :psmMap.entrySet()){
                	counts2.put(map.getValue());
                }
                for(Map.Entry<Integer,Integer> map :rentalMap.entrySet()){
                	counts3.put(map.getValue());
                }
                
     

                try{
                   counts.put("countsPRS",counts1 );
                   counts.put("countsPSM",counts2 );
                   counts.put("countsRENTAL",counts3 );
                  
                    

                }catch(Exception e){

                }
                    response.setContentType("text/plain");
                    response.setCharacterEncoding("UTF-8");
                  response.getWriter().write(counts.toString());    
           }
        }
        
       
   // }
        private Map<Integer, Integer> getMapper() {
        Calendar current=Calendar.getInstance();
            int    highest=current.get(Calendar.HOUR_OF_DAY);
    	 Map<Integer, Integer> map = new LinkedHashMap<Integer, Integer>();
    	 for(int i=0;i<=highest;i++){
    		 map.put(i, 0);
    	 }
		return map;
	}
     public AggregateIterable<Document> getCounts(String database, String collection,String serverAddress){
         
           
            Calendar current= Calendar.getInstance();
           
            int currYear=current.get(Calendar.YEAR);
            int currMonth=current.get(Calendar.MONTH);
            currMonth=4;
            currYear=2015;
            int currDay=current.get(Calendar.DAY_OF_MONTH);
            
            
            
            Calendar curr_6AM=Calendar.getInstance();
            curr_6AM.set(currYear, currMonth,18,0,0,0);
            curr_6AM.set(Calendar.MILLISECOND,0);
           // out.println(curr_6AM.getTimeInMillis());
            
            
           // MongoClient mongoClient = new MongoClient(new ServerAddress(serverAddress,27017));
            MongoClient mongoClient = new MongoClient();
            // MongoClient mongoClient = new MongoClient();
AggregateIterable<Document> iterable_6_9_p = mongoClient.getDatabase(database).getCollection(collection).aggregate(asList(
        new Document("$match", new Document("openDate",curr_6AM.getTimeInMillis())
                //.append("openDate",curr_6AM.getTimeInMillis())                
                
                //.append("recordTime", new Document("$gte",curr_6AM.getTimeInMillis()).append("$lt", curr_9AM.getTimeInMillis()))
        ),
        new Document("$group", new Document("_id", new Document("hour","$openHour").append("type", "$alertType")).append("count", new Document("$sum", 1)))));

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
