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
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import static java.util.Arrays.asList;
import java.util.Properties;
import javax.servlet.RequestDispatcher;
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
public class MCRMData extends HttpServlet {

     String user=null;
     String process1=null;
     static Document document;
     static String SL="no data";
     static String VM="no data";
    /**
     * 
     * 
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
            String database=(String)defaultProps.get("database_mCRMWeekCount");
            String database_forSL=(String)defaultProps.get("database_PRSCompilation");
            String collection=(String)defaultProps.get("collection_mCRMWeekCount");
            String collection_forSL=(String)defaultProps.get("collection_PRSCompilation");
            String serverAddress=(String)defaultProps.get("IP_mCRM");
            String serverAddress_forSL=(String)defaultProps.get("IP_AlertsProcess");
            
            
            /* TODO output your page here. You may use following sample code. */
           String useremail=(String)request.getParameter("useremail");
           //useremail="Ajit3204@gmail.com";
           document=null;
            Document mcrmobject=getMCRMObject(database,collection,serverAddress,useremail);
           
           
           String PRSUSER= "no data";
           PRSUSER=getMCRMData("PRS",database,collection,serverAddress,useremail);
           
           String RENTALUSER= "no data";
           RENTALUSER=getMCRMData("RENTAL",database,collection,serverAddress,useremail);
           
           String PSMUSER= "no data";
           PSMUSER=getMCRMData("PSM",database,collection,serverAddress,useremail);
            SL="no data";
             VM="no data";
           getSL_VM(database_forSL,collection_forSL,serverAddress_forSL,useremail);
           
           
            JSONArray jsonarray= new JSONArray();
            JSONArray jsonarray1= new JSONArray();
           JSONObject json=new JSONObject(); 
           try{
           jsonarray.put(new JSONObject().put("PRS",PRSUSER));
           jsonarray.put(new JSONObject().put("RENTAL",RENTALUSER));
           jsonarray.put(new JSONObject().put("PSM",PSMUSER));
           json.put("data",jsonarray);
           json.put("object",mcrmobject);
           json.put("SL",SL);
           json.put("VM",VM);
           //jsonarray.put(new JSONObject().put("object",mcrmobject));
             
           }catch(Exception e){
               
           }
          response.setContentType("text/plain");
    response.setCharacterEncoding("UTF-8");
  response.getWriter().write(json.toString()); 
  
 
  
           
        }
    }
    //----------------------------------------------------------------------------------------
    public Document getMCRMObject(String database, String collection,String serverAddress,String email){
        MongoClient mongoClient = new MongoClient(new ServerAddress(serverAddress,27017));
                MongoDatabase db = mongoClient.getDatabase(database);
                
FindIterable<Document> iterable = db.getCollection(collection).find(
                                                                new Document("email", email))
                                                                  .projection(new Document("email",0).append("_id", 0));
iterable.forEach(new Block<Document>() {
    @Override
    public void apply(final Document document) {
        MCRMData.document=document;
    }
});
           return document;
    }
    //------------------------------------------------------------------------------------
    public void getSL_VM(String database, String collection,String serverAddress,String email){
        MongoClient mongoClient = new MongoClient(new ServerAddress(serverAddress,27017));
                MongoDatabase db = mongoClient.getDatabase(database);
                
FindIterable<Document> iterable = db.getCollection(collection).find(
                                                                new Document("email", email))
                                                                .sort(new Document("_id",-1))
                                                                 .limit(1);
iterable.forEach(new Block<Document>() {
    @Override
    public void apply(final Document document) {
        SL=(String)document.get("subject");
        VM=(String)document.get("vmfilename");
    }
});

    }
    //------------------------------------------------------------------------------------
    public String getMCRMData(String process,String database, String collection,String serverAddress,String email){
        process1=process;
        user="no data";
                //MongoClient mongoClient = new MongoClient(new ServerAddress(serverAddress,27017));
        MongoClient mongoClient = new MongoClient();
                MongoDatabase db = mongoClient.getDatabase(database);
                
FindIterable<Document> iterable = db.getCollection(collection).find(
                                                                new Document("email", email));
        iterable.forEach(new Block<Document>() {
    @Override
    public void apply(final Document document) {
       
       if(document.containsKey(""+process1+"_TOTAL_OPENED") || document.containsKey(""+process1+"_TOTAL_CONTACTS")){
           String values=null;
           if(document.containsKey(""+process1+"_TOTAL_OPENED") && document.containsKey(""+process1+"_TOTAL_CONTACTS")){
               values="both";
           }else if(document.containsKey(""+process1+"_TOTAL_OPENED") && !(document.containsKey(""+process1+"_TOTAL_CONTACTS"))){
               values="mail";
           }else if(!(document.containsKey(""+process1+"_TOTAL_OPENED")) && document.containsKey(""+process1+"_TOTAL_CONTACTS")){
               values="contact";
           }
           if(values.equals("both"))
           {
               if((int)document.get(""+process1+"_TOTAL_OPENED")>=10 || (int)document.get(""+process1+"_TOTAL_CONTACTS")>=5){
               user="MostActiveUser";
               
                }else if((int)document.get(""+process1+"_TOTAL_OPENED")>=5 || (int)document.get(""+process1+"_TOTAL_CONTACTS")>=2){
                    user="ActiveUser";
                }else if((int)document.get(""+process1+"_TOTAL_OPENED")>=2 || (int)document.get(""+process1+"_TOTAL_CONTACTS")>=1){
                    user="SlightlyActiveUser";
                }
                   
           }else if(values.equals("mail")){
               if((int)document.get(""+process1+"_TOTAL_OPENED")>=10){
               user="MostActiveUser";
               
                }else if((int)document.get(""+process1+"_TOTAL_OPENED")>=5){
                     user="ActiveUser";
                }else if((int)document.get(""+process1+"_TOTAL_OPENED")>=2){
                     user="SlightlyActiveUser";
                }
           }else if(values.equals("contact")){
               if((int)document.get(""+process1+"_TOTAL_CONTACTS")>=5){
               user="MostActiveUser";
               
                }else if((int)document.get(""+process1+"_TOTAL_CONTACTS")>=2){
                    user="ActiveUser";
                }else if((int)document.get(""+process1+"_TOTAL_CONTACTS")>=1){
                    user="SlightlyActiveUser";
                }
           }
       }
       if(user.equals("no data")){
           
           if(document.containsKey(""+process1+"1WEEK_OPENED") || document.containsKey(""+process1+"1WEEK_CONTACTS")){
           user="OtherContact1Week";
            }
       }
       if(user.equals("no data")){
           
           if(document.containsKey(""+process1+"2WEEK_OPENED") || document.containsKey(""+process1+"2WEEK_CONTACTS")
              || document.containsKey(""+process1+"3WEEK_OPENED") || document.containsKey(""+process1+"3WEEK_CONTACTS")     ){
           user="OtherContact2n3Week";
            }
       }
       if(user.equals("no data")){
           
           if(document.containsKey("WEEK1_TOTAL_TRAFFIC")){
           user="PotentialLead1Week";
            }
       }
       if(user.equals("no data")){
           
           if(document.containsKey("WEEK2_TOTAL_TRAFFIC") || document.containsKey("WEEK3_TOTAL_TRAFFIC")){
           user="PotentialLead2n3Week";
            }
       }
       if(user.equals("no data")){
           
           if(document.containsKey(""+process1+"1WEEK_OPENED") || document.containsKey(""+process1+"1WEEK_CONTACTS")
              ||document.containsKey(""+process1+"2WEEK_OPENED") || document.containsKey(""+process1+"2WEEK_CONTACTS")     
              || document.containsKey(""+process1+"3WEEK_OPENED") || document.containsKey(""+process1+"3WEEK_CONTACTS")
              || document.containsKey(""+process1+"4WEEK_OPENED") || document.containsKey(""+process1+"4WEEK_CONTACTS") ){
           user="RecentInactive";
            }
       }
        if(user.equals("no data")){
           user="Inactive";
            
       }
      }
      
      
    
});
        return user;
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
