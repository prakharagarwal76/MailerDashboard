package com.AlertMailerWebPage.servlet;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import com.mongodb.BasicDBObject;
import com.mongodb.Block;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.ServerAddress;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Properties;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.bson.Document;

/**
 *
 * @author prakharagarwal
 */
public class Login extends HttpServlet {
        static int flag=0; 
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
            
            /* TODO output your page here. You may use following sample code. */
          final String username= request.getParameter("username");
       final String pass= request.getParameter("password");
        flag=0;
      // MongoClient mongoClient = new MongoClient(new ServerAddress(serverAddress,27017));
        MongoClient mongoClient = new MongoClient();
       MongoDatabase db = mongoClient.getDatabase(database);
       Document query = new Document("login","login");
       Cookie ck=new Cookie("login",null);
       if(username==null || pass==null){
           ck.setValue("failed");  
            response.addCookie(ck);//adding cookie in the response  
           RequestDispatcher rd =request.getRequestDispatcher("index.html");;
           rd.forward(request, response);
       }
       FindIterable<Document> iterable = db.getCollection(collection).find(query);
       iterable.forEach(new Block<Document>() {
    @Override
    public void apply(final Document document) {
        if(username.equals((String)document.get("username")) && pass.equals((String)document.get("password"))){
            flag=1;
        }
    }
});
       if(flag==1){
           ck.setValue("success");
            response.addCookie(ck);//adding cookie in the response  
           response.sendRedirect("Page1.html");
           
       }
       else
       {
           
           ck.setValue("failed");  
            response.addCookie(ck);//adding cookie in the response  
           RequestDispatcher rd =request.getRequestDispatcher("index.html");;
           rd.forward(request, response);
       }
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
