package com.AlertMailerWebPage.servlet;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Properties;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author prakharagarwal
 */
public class Show extends HttpServlet {

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
            
         Mongo mongo = new Mongo("localhost", 27017);
         //   Mongo mongo=new Mongo(serverAddress,27017);
    //DB db = mongo.getDB("dashboard" );
        DB db = mongo.getDB(database);
            
    DBCollection coll=db.getCollection(collection);
    //DBCollection coll=db.getCollection("users");
    DBObject query = new BasicDBObject("AlertMailer","PRS");
    DBObject query1 = new BasicDBObject("InsertTime",-1);
    //DBObject query = new BasicDBObject("_id",-1);
    DBCursor cursor = coll.find(query).sort(query1).limit(1);
    
    
    
//String name1= (String)cursor.one().get("name");    
//while(cursor.hasNext()){
    //    out.println(""+cursor.next()+"");
    //}
    response.setContentType("text/plain");
    response.setCharacterEncoding("UTF-8");
  response.getWriter().write(cursor.one().toString());           
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
