package org.iesalixar.mail;

import java.util.Date;

import lombok.Data;

@Data
public class Mail {

    private String username;
    private String to;
    private String subject;
    private String text;
    private Date sendDate;
    
    
}
