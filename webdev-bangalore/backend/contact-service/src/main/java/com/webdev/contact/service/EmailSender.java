package com.webdev.contact.service;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class EmailSender {

    @Value("${APP_PASSWORD}")
    private String appPassword;
    private final String username = "sambasivareddy.g@gmail.com"; 


    public  void  sendEmail(String notificationMessage) {
        // Configuration
        
       // Gmail SMTP Server Settings
        Properties prop = new Properties();
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "587"); // TLS Port
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true"); // TLS

        // Authenticate Session
        Session session = Session.getInstance(prop, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, appPassword);
            }
        });

        try {
            // Compose Email
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(username) // Sending to yourself
            );
            message.setSubject("InDevFlux - New Requirement");
            message.setText(notificationMessage);

            // Send Email
            Transport.send(message);
     
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}