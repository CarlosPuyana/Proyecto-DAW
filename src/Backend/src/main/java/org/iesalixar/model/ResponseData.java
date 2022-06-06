package org.iesalixar.model;

public class ResponseData {
	private String fileName;
	private String downloadURL;
	private String fileType;
    private Long fileSize;
    
    
	public String getAnswer() {
		return fileName;
	}
	public void setfileName(String fileName) {
		this.fileName = fileName;
	}
	public String getDownloadURL() {
		return downloadURL;
	}
	public void setDownloadURL(String downloadURL) {
		this.downloadURL = downloadURL;
	}
	public String getFileType() {
		return fileType;
	}
	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
	public Long getFileSize() {
		return fileSize;
	}
	public void setFileSize(Long fileSize) {
		this.fileSize = fileSize;
	}
	public ResponseData(String fileName, String downloadURL, String fileType, Long fileSize) {
		super();
		this.fileName = fileName;
		this.downloadURL = downloadURL;
		this.fileType = fileType;
		this.fileSize = fileSize;
	}
    

    
	public ResponseData() {
		// TODO Auto-generated constructor stub
	}
}
