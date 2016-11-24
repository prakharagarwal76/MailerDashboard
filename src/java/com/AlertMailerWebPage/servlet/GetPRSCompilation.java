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
import com.mongodb.MongoClientOptions;
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
public class GetPRSCompilation extends HttpServlet {

        ArrayList<Integer> list = new ArrayList<Integer>();
         JSONArray counts1= new JSONArray();
         JSONArray counts2= new JSONArray();
         JSONArray counts22= new JSONArray();
         JSONObject counts3=new JSONObject();
           
          
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
            String database=(String)defaultProps.get("database_PRSCompilation");
            String database_sent=(String)defaultProps.get("database_requirementLog");
            String collection=(String)defaultProps.get("collection_PRSCompilation");
            String collection_sent=(String)defaultProps.get("collection_requirementLog");
            String serverAddress=(String)defaultProps.get("IP_AlertsProcess");
            String serverAddress_sent=(String)defaultProps.get("IP_mbstats");
            
            
          
//final JSONObject counts= new JSONObject();            


AggregateIterable<Document> counts_PRS_daily=getCounts(database,collection,serverAddress,"daily");

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
	//System.out.println("counts1 " + counts1);

AggregateIterable<Document> counts_PRS_weekly=getCounts(database,collection,serverAddress,"weekly");


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
        
       // System.out.println("counts2 " + counts2);
        AggregateIterable<Document> counts_PRS_monthly=getCounts(database,collection,serverAddress,"monthly");
        
        
        counts_PRS_monthly.forEach(new Block<Document>() {
            @Override
            public void apply(final Document document) {
                String errorcode=(String)document.get("_id");
                int count1=(int) document.get("count");
                JSONObject counts= new JSONObject();
                try{
                    counts.put(errorcode,count1);
                    counts22.put(counts);
                }catch(Exception e){

                }

            }
                    });
        
        //System.out.println("counts22 " + counts22);
        AggregateIterable<Document> counts_PRS_daily_total=getCounts(database,collection,serverAddress,"daily_total");
      
        
         counts_PRS_daily_total.forEach(new Block<Document>() {
            @Override
            public void apply(final Document document) {
                
                
                try{
                    int count=(int)document.get("count");
                    counts3.put("daily_total_compilation",count);
                }catch(Exception e){

                }

            }
                    });
         //System.out.println("counts3 -1" + counts3);
        
         AggregateIterable<Document> counts_PRS_weekly_total=getCounts(database,collection,serverAddress,"weekly_total");
       
         counts_PRS_weekly_total.forEach(new Block<Document>() {
            @Override
            public void apply(final Document document) {
                
                
                try{
                    int count=(int)document.get("count");
                    counts3.put("weekly_total_compilation",count);
                }catch(Exception e){

                }

            }
                    });
         
        // System.out.println("counts3 -2" + counts3);
         
         AggregateIterable<Document> counts_PRS_monthly_total=getCounts(database,collection,serverAddress,"monthly_total");   
         
         
          counts_PRS_monthly_total.forEach(new Block<Document>() {
            @Override
            public void apply(final Document document) {
                
                
                try{
                    int count=(int)document.get("count");
                    counts3.put("monthly_total_compilation",count);
                }catch(Exception e){

                }

            }
                    });
         // System.out.println("counts3 -3" + counts3);
          
          AggregateIterable<Document> counts_PRSSent_daily_total=getCounts(database_sent,collection_sent,serverAddress_sent,"daily_total");
       
         counts_PRSSent_daily_total.forEach(new Block<Document>() {
            @Override
            public void apply(final Document document) {
                
                
                try{
                    int count=(int)document.get("count");
                    counts3.put("daily_total_sent",count);
                }catch(Exception e){

                }

            }
                    });
         //System.out.println("counts3 -4" + counts3);
         
         AggregateIterable<Document> counts_PRSSent_weekly_total=getCounts(database_sent,collection_sent,serverAddress_sent,"weekly_total");
         
       
         counts_PRSSent_weekly_total.forEach(new Block<Document>() {
            @Override
            public void apply(final Document document) {
                
                
                try{
                    int count=(int)document.get("count");
                    counts3.put("weekly_total_sent",count);
                }catch(Exception e){

                }

            }
                    });
         
         //System.out.println("counts3 -5" + counts3);
         AggregateIterable<Document> counts_PRSSent_monthly_total=getCounts(database_sent,collection_sent,serverAddress_sent,"monthly_total");
         counts_PRSSent_monthly_total.forEach(new Block<Document>() {
            @Override
            public void apply(final Document document) {
                
                
                try{
                    int count=(int)document.get("count");
                    counts3.put("monthly_total_sent",count);
                }catch(Exception e){

                }

            }
                    });
         
         //System.out.println("counts3 -6" + counts3);


try{
    counts3.put("today",counts1);
    counts3.put("weekly",counts2);
    counts3.put("monthly",counts22);
}catch(Exception e){
    
}

    response.setContentType("text/plain");
    response.setCharacterEncoding("UTF-8");
  response.getWriter().write(counts3.toString());        
        }
        
       
    }
     public AggregateIterable<Document> getCounts( String database, String collection,String serverAddress,String time){
         
//            list.clear();
            String groupBy="$vmfilename";
            Calendar previousTime=Calendar.getInstance();
            
            previousTime.set(Calendar.HOUR_OF_DAY,0);
            previousTime.set(Calendar.MINUTE,0);
            previousTime.set(Calendar.SECOND,0);
            previousTime.set(Calendar.MILLISECOND,0);
            previousTime.set(2016,6,7,0,0,0);
            previousTime.set(Calendar.MILLISECOND,0);
            Calendar todayCalendar=Calendar.getInstance();
            todayCalendar.set(2016,6,7,23,59,59);
             todayCalendar.set(Calendar.MILLISECOND,0);
           if(time.equals("weekly")){
           previousTime.set(Calendar.DATE,previousTime.get(Calendar.DATE)-6);
           todayCalendar.set(2016,6,7,0,0,0);
             todayCalendar.set(Calendar.MILLISECOND,0);
         }else  if(time.equals("monthly")){
        	 previousTime.set(Calendar.DATE,previousTime.get(Calendar.DATE)-29);
                 todayCalendar.set(2016,6,7,0,0,0);
             todayCalendar.set(Calendar.MILLISECOND,0);
         }else if(time.equals("daily_total")){
             groupBy=null;
             previousTime.set(2016,6,4,0,0,0);
            previousTime.set(Calendar.MILLISECOND,0);
            todayCalendar.set(2016,6,4,23,59,59);
         }else if(time.equals("weekly_total")){
             groupBy=null;
             previousTime.set(2016,6,4,0,0,0);
             previousTime.set(Calendar.MILLISECOND,0);
             previousTime.set(Calendar.DATE,previousTime.get(Calendar.DATE)-6);
             todayCalendar.set(2016,6,4,0,0,0);
             todayCalendar.set(Calendar.MILLISECOND,0);
         }else if(time.equals("monthly_total")){
             groupBy=null;
             previousTime.set(2016,6,4,0,0,0);
             previousTime.set(Calendar.MILLISECOND,0);
             previousTime.set(Calendar.DATE,previousTime.get(Calendar.DATE)-29);
             todayCalendar.set(2016,6,4,0,0,0);
             todayCalendar.set(Calendar.MILLISECOND,0);
         }
          
            
            AggregateIterable<Document> iterable_6_9_p;
            
            if(collection.equals("requirementLog")){

                 MongoClient mongoClient = new MongoClient();
                         iterable_6_9_p = mongoClient.getDatabase(database).getCollection(collection).aggregate(asList(
                new Document("$match", new Document("sentDate", new Document("$gte",previousTime.getTimeInMillis()).append("$lte", todayCalendar.getTimeInMillis()))
                .append("isMailSent","Y")        
                .append("alertType", "PRS")
                        
                        //.append("date", new Document("$gte",Long.toString(curr_6AM.getTimeInMillis())).append("$lt", Long.toString(curr_24PM.getTimeInMillis())))
                ),

                new Document("$group", new Document("_id",groupBy).append("count", new Document("$sum", 1)))));
                
            }else
            {
                
                        MongoClient mongoClient = new MongoClient();
                        iterable_6_9_p = mongoClient.getDatabase(database).getCollection(collection).aggregate(asList(
                new Document("$match", new Document("date", new Document("$gte",Long.toString(previousTime.getTimeInMillis())).append("$lte", Long.toString(todayCalendar.getTimeInMillis())))
                       // .append("alertType", alertType)
                         //.append("isMailSent", isMailSent)
                        //.append("date", new Document("$gte",Long.toString(curr_6AM.getTimeInMillis())).append("$lt", Long.toString(curr_24PM.getTimeInMillis())))
                ),

                new Document("$group", new Document("_id",groupBy).append("count", new Document("$sum", 1)))));
            }



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
