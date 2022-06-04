package org.iesalixar.services;

import org.iesalixar.mail.Mail;

public interface MailService {

	Mail sendSimpleMail(Mail mail);
}
