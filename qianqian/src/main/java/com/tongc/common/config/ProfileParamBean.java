package com.tongc.common.config;

import com.alibaba.fastjson.JSONArray;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

public class ProfileParamBean {

	private String requestUrl;

	@Value("${customerCreditGateway}")
	private String customerCreditGateway;

	@Value("${customerCreditKey}")
	private String customerCreditKey;


	@Value("${openChannel}")
	private String openChannel;


	@Value("${platform}")
	private String platform;


	@Value("${togatherType}")
	private String togatherType;

	@Value("${userAgent}")
	private String userAgent;

	@Value("${version}")
	private String version;

	@Value("${mechanism}")
	private String mechanism;

	@Value("${projectNo}")
	private String projectNo;



	public String getCustomerCreditGateway() {
		return customerCreditGateway;
	}

	public String getRequestUrl() {
		return requestUrl;
	}

	public void setRequestUrl(String requestUrl) {
		this.requestUrl = requestUrl;
	}

	public void setCustomerCreditGateway(String customerCreditGateway) {
		this.customerCreditGateway = customerCreditGateway;
	}

	public String getCustomerCreditKey() {
		return customerCreditKey;
	}

	public void setCustomerCreditKey(String customerCreditKey) {
		this.customerCreditKey = customerCreditKey;
	}

	public String getOpenChannel() {
		return openChannel;
	}

	public void setOpenChannel(String openChannel) {
		this.openChannel = openChannel;
	}

	public String getPlatform() {
		return platform;
	}

	public void setPlatform(String platform) {
		this.platform = platform;
	}

	public String getTogatherType() {
		return togatherType;
	}

	public void setTogatherType(String togatherType) {
		this.togatherType = togatherType;
	}

	public String getUserAgent() {
		return userAgent;
	}

	public void setUserAgent(String userAgent) {
		this.userAgent = userAgent;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getMechanism() {
		return mechanism;
	}

	public void setMechanism(String mechanism) {
		this.mechanism = mechanism;
	}

	public String getProjectNo() {
		return projectNo;
	}

	public void setProjectNo(String projectNo) {
		this.projectNo = projectNo;
	}
}
