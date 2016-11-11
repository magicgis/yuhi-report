package com.yuhi.compent;

import java.util.Map;
import java.util.logging.Logger;

import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;

import org.springframework.web.servlet.view.jasperreports.JasperReportsMultiFormatView;

public class ApplicationIreportView extends JasperReportsMultiFormatView {

	private JasperReport jasperReport;

	public ApplicationIreportView() {
		super();
	}
	
	
	@Override
	protected JasperPrint fillReport(Map<String, Object> model)
			throws Exception {
		// TODO Auto-generated method stub
		if(model.containsKey("url")){
			 setUrl(String.valueOf(model.get("url")));  
	         this.jasperReport = loadReport();  
		}
		return super.fillReport(model);
	}
	 @Override
	 protected JasperReport getReport() {  
	        return this.jasperReport;  
	 }  
}
