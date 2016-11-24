package com.AlertMailerWebPage.servlet;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.Block;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.ServerAddress;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;
import com.mongodb.util.JSON;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.Reader;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.Properties;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.bson.BSONObject;
import org.bson.Document;
import org.json.JSONArray;
import org.json.JSONObject;
import org.omg.PortableInterceptor.SYSTEM_EXCEPTION;

/**
 *
 * @author prakharagarwal
 */
public class Save extends HttpServlet {

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
            String database=(String)defaultProps.get("database_mailerDetails");
            String collection=(String)defaultProps.get("collection_mailerDetails");
            String serverAddress=(String)defaultProps.get("IP_AMDBoard");
            
            
          String relaxation=request.getParameter("relaxation2");
         String alertmailer=request.getParameter("alertmailer");
            String SUBJECT_OWNER_NoNMultiStory=request.getParameter("SUBJECT_OWNER_NoNMultiStory2");
       String SUBJECT_NoNOWNER_NoNMultiStory=request.getParameter("SUBJECT_NoNOWNER_NoNMultiStory2");
          //Mongo mongo = new Mongo("localhost", 27017);
            
           
    

    
 

  
        try{ org.json.JSONArray jj= new JSONArray(relaxation);
            int j=jj.length();
            out.println(j);
            BasicDBList ll1= new BasicDBList();
                for  (int i = 0; i < jj.length(); i++) {
                    JSONObject jsonobject = jj.getJSONObject(i);
                    BasicDBObject n= (BasicDBObject)JSON.parse(jsonobject.toString());
                        ll1.add(n);
                        
                    out.println(jsonobject.toString());
                    }
 
out.println("ok");
        // Document m= Document.parse(relaxation);
         //String o=(String)m;
         
            
            String SUBJECT_OWNER_MULTISTORY_RENT=request.getParameter("SUBJECT_OWNER_MULTISTORY_RENT2");
            
           String vm=request.getParameter("vm2");
            String SUBJECT_NoNOWNER_MULTISTORY_RENT=request.getParameter("SUBJECT_NoNOWNER_MULTISTORY_RENT2");
            String SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER=request.getParameter("SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER2");
            String SUBJECT_OWNER_MULTISTORY_SALE=request.getParameter("SUBJECT_OWNER_MULTISTORY_SALE2");
            String PREHEADER_NoNOWNER_RENT=request.getParameter("PREHEADER_NoNOWNER_RENT2");
            String SUBJECT_NoNOWNER_MULTISTORY_SALE=request.getParameter("SUBJECT_NoNOWNER_MULTISTORY_SALE2");
            String SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER=request.getParameter("SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER2");
            String PREHEADER_NoNOWNER_SALE=request.getParameter("PREHEADER_NoNOWNER_SALE2");
            String noofprops=request.getParameter("noofprops");
           // MongoClient mongoClient = new MongoClient(new ServerAddress(serverAddress,27017));
           MongoClient mongoClient = new MongoClient();
  
    
    
    
            mongoClient.getDatabase(database).getCollection(collection).insertOne( new Document(
        //mongoClient.getDatabase("dashboard").getCollection("users").insertOne( new Document(
        "AlertMailer",alertmailer)
               .append("InsertTime", Calendar.getInstance().getTimeInMillis())
                    .append("SUBJECT_OWNER_NoNMultiStory", Arrays.asList(SUBJECT_OWNER_NoNMultiStory.split(",")))
                    .append("SUBJECT_NoNOWNER_NoNMultiStory", Arrays.asList(SUBJECT_NoNOWNER_NoNMultiStory.split(",")))
                .append("SUBJECT_OWNER_MULTISTORY_RENT",Arrays.asList(SUBJECT_OWNER_MULTISTORY_RENT.split(",")))
               .append("SUBJECT_NoNOWNER_MULTISTORY_RENT", Arrays.asList(SUBJECT_NoNOWNER_MULTISTORY_RENT.split(",")))
               .append("SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER", Arrays.asList(SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER.split(",")))
                .append("PREHEADER_NoNOWNER_RENT", Arrays.asList(PREHEADER_NoNOWNER_RENT.split(",")))    
                    .append("SUBJECT_OWNER_MULTISTORY_SALE", Arrays.asList(SUBJECT_OWNER_MULTISTORY_SALE.split(",")))
                    .append("SUBJECT_NoNOWNER_MULTISTORY_SALE", Arrays.asList(SUBJECT_NoNOWNER_MULTISTORY_SALE.split(",")))
                    .append("SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER", Arrays.asList(SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER.split(",")))
                    .append("PREHEADER_NoNOWNER_SALE", Arrays.asList(PREHEADER_NoNOWNER_SALE.split(",")))
                    .append("VM",Arrays.asList(vm.split(",")))
                .append("Relaxation", ll1)
                .append("NoOfProperties", noofprops));
              
             
    }catch(Exception e){}
       
        RequestDispatcher rd= request.getRequestDispatcher("Page1.html");
       rd.forward(request, response);
        }
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
    

