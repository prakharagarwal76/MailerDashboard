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
public class GetWeeklyOpenMail extends HttpServlet {

       int highest=0;
       int lowest=0;
       Map<Long, Integer> prsMap = null;
       Map<Long, Integer> psmMap = null;
       Map<Long, Integer> rentalMap =null;
       
        
       
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
            final JSONArray counts11= new JSONArray();
            final JSONArray counts2= new JSONArray();
            final JSONArray counts22= new JSONArray();
            final JSONArray counts3= new JSONArray();
            final JSONArray counts33= new JSONArray();
            
           final JSONArray labels=new JSONArray();
            
            
                JSONObject counts= new JSONObject();
               AggregateIterable<Document> countsPRS=getCounts(database,collection,serverAddress);
                
                
                Calendar current= Calendar.getInstance();
            Calendar min_13=Calendar.getInstance();
            
           
          
           //min_13.set(2015,4,18,0,0,0);
          //current.set(2015,4,18,0,0,0);
          //current.add(Calendar.DATE,13);
            min_13.add(Calendar.DATE,-13);
         
          int day=current.get(Calendar.DAY_OF_WEEK);
          
          
         if(day==1){
              String[] label ={"monday","tuesday","wednesday","thursday","friday","saturday","sunday(today)"};
              labels.put(label);
          }else if(day==2){
              String[] label={"tuesday","wednesday","thursday","friday","saturday","sunday","monday(today)"};
              labels.put(label);
          }else if(day==3){
              String[] label={"wednesday","thursday","friday","saturday","sunday","monday","tuesday(today)"};
              labels.put(label);
          }else if(day==4){
              String[] label={"thursday","friday","saturday","sunday","monday","tuesday","wednesday(today)"};
              labels.put(label);
          }else if(day==5){
              String[] label={"friday","saturday","sunday","monday","tuesday","wednesday","thursday(today)"};
              labels.put(label);
          }else if(day==6){
              String[] label={"saturday","sunday","monday","tuesday","wednesday","thursday","friday(today)"};
              labels.put(label);
          }else if(day==7){
              String[] label={"sunday","monday","tuesday","wednesday","thursday","friday","saturday(today)"};
              labels.put(label);
          }     
          //labels.put(label);     
         countsPRS.forEach(new Block<Document>() {
                            @Override
                            public void apply(final Document document) {
                                Document doc1=(Document)document.get("_id");
                                long date=(long)doc1.get("date");
                                type=(String)doc1.get("type");
                                val=(int)document.get("count");
                                if(type.equalsIgnoreCase("PRS")){
                                	prsMap.put(date, val);
                                }else if(type.equalsIgnoreCase("PSM")){
                                	psmMap.put(date, val);
                                }else if(type.equalsIgnoreCase("RENTAL")){
                                	rentalMap.put(date, val);
                                        
                                }
                            
                            }

                        });
         int limit=0;
                for(Map.Entry<Long,Integer> map :prsMap.entrySet()){
                if(limit<=6){	
                    counts1.put(map.getValue());
                        limit++;
                }
              }
                for(Map.Entry<Long,Integer> map :prsMap.entrySet()){
                if(limit<=13){	
                    counts11.put(map.getValue());
                        limit++;
                }
                }
                
                limit=0;
                for(Map.Entry<Long,Integer> map :psmMap.entrySet()){
                if(limit<=6){	
                    counts2.put(map.getValue());
                        limit++;
                }
              }
                for(Map.Entry<Long,Integer> map :psmMap.entrySet()){
                if(limit<=13){	
                    counts22.put(map.getValue());
                        limit++;
                }
                }
                
                limit=0;
                for(Map.Entry<Long,Integer> map :rentalMap.entrySet()){
                if(limit<=6){	
                    counts3.put(map.getValue());
                        limit++;
                }
              }
                for(Map.Entry<Long,Integer> map :rentalMap.entrySet()){
                if(limit<=13){	
                    counts33.put(map.getValue());
                        limit++;
                }
                }
                
                
     //--------------------------------------------------------
     

                try{
                   counts.put("countsPRS_LL",counts1 );
                   counts.put("countsPRS_L",counts11);
                   counts.put("countsPSM_LL",counts2 );
                   counts.put("countsPSM_L",counts22 );
                   counts.put("countsRENTAL_LL",counts3 );
                   counts.put("countsRENTAL_L",counts33 );
                   
                   counts.put("labels",labels);
                    

                }catch(Exception e){

                }
                    response.setContentType("text/plain");
                    response.setCharacterEncoding("UTF-8");
                  response.getWriter().write(counts.toString());    
           }
        }
        
       
   // }
    private Map<Long, Integer> getMapper() {
       Calendar current= Calendar.getInstance();
       /*current.set(Calendar.HOUR_OF_DAY,0);
       current.set(Calendar.MINUTE,0);
       current.set(Calendar.SECOND,0);
       current.set(Calendar.MILLISECOND,0);
       current.add(Calendar.DATE, -13);*/
       current.set(2015,4,12,0,0,0);
       current.set(Calendar.MILLISECOND,0);
       
    	 Map<Long, Integer> map = new LinkedHashMap<Long, Integer>();
    	 for(int i=0;i<=13;i++){
            long millis=current.getTimeInMillis();
    		 map.put(millis, 0);
                 current.add(Calendar.DATE,1);
    	 }
		return map;
	}
        
     public AggregateIterable<Document> getCounts( String database, String collection,String serverAddress){
         
           
            Calendar current= Calendar.getInstance();
            Calendar min_13=Calendar.getInstance();
           
          
           min_13.set(2015,4,12,0,0,0);
           min_13.set(Calendar.MILLISECOND,0);
          current.set(2015,4,12,23,59,59);
          
          current.add(Calendar.DATE,13);
          /*min_13.add(Calendar.DATE,-13);
            int y=min_13.get(Calendar.YEAR);
                    int m=min_13.get(Calendar.MONTH);
                    int d=min_13.get(Calendar.DAY_OF_MONTH);
               min_13.set(y,m,d,0,0,0);
            min_13.set(Calendar.MILLISECOND,0);*/
            
            //MongoClient mongoClient = new MongoClient(new ServerAddress(serverAddress,27017));
            MongoClient mongoClient = new MongoClient();
AggregateIterable<Document> iterable_6_9_p = mongoClient.getDatabase(database).getCollection(collection).aggregate(asList(
        new Document("$match", new Document("openDate", new Document("$gte",min_13.getTimeInMillis()).append("$lte", current.getTimeInMillis()))
                //.append("alertType", alertType)                
                //.append("openDate", new Document("$gte",min_13.getTimeInMillis()).append("$lte", current.getTimeInMillis()))
        ),
        new Document("$group", new Document("_id", new Document("date","$openDate").append("type", "$alertType")).append("count", new Document("$sum", 1)))));

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
