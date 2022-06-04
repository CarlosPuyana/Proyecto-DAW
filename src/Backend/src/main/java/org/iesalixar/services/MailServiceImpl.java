package org.iesalixar.services;

import org.iesalixar.mail.Mail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service("mailService")
public class MailServiceImpl implements MailService {

	private static final Logger log = LoggerFactory.getLogger(MailServiceImpl.class);
	
	@Autowired private JavaMailSender javaMailSender;
	
	@Value("${spring.mail.username}")
    private String from;

	@Override
	public Mail sendSimpleMail(Mail mail) {
		
		SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setSubject(mail.getSubject());
        message.setText(mail.getText());
        message.setTo(mail.getTo());
        message.setSentDate(mail.getSendDate());
        try {
            javaMailSender.send(message);
            log.info("success to send mail .");
        } catch (MailException e) {
            e.printStackTrace();
            log.info("failed to send mail .");
        }
        return mail;
	}
	
}
