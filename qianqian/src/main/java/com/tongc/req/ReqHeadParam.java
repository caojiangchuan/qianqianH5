/*
* Copyright (c) 2015 zendaimoney.com. All Rights Reserved.
*/
package com.tongc.req;

import com.tongc.common.utils.StringUtil;
import lombok.Data;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.Serializable;

/**
 * ReqHeadParam
 * <p/>
 * Author: Hao Chen
 * Date: 2015/6/29 15:10
 * Mail: haoc@zendaimoney.com
 * $Id$
 */
@Data
public class ReqHeadParam implements Serializable {
    private static Log logger = LogFactory.getLog(ReqHeadParam.class);

    private String token;

    private String sessionToken;

    private String userAgent;

    private String version;
    
    //机构
    private String mechanism;
    //平台
    private String platform;
    //合作类型
    private String togatherType;
    //渠道
    private String openchannel;

    private String deviceNum;

    public ReqHeadParam()
    {
        this.setSessionToken("");
        this.setToken("");
    }

    public static Log getLogger() {
        return logger;
    }

    public static void setLogger(Log logger) {
        ReqHeadParam.logger = logger;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getSessionToken() {
        return sessionToken;
    }

    public void setSessionToken(String sessionToken) {
        this.sessionToken = sessionToken;
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

    public String getOpenchannel() {
        return openchannel;
    }

    public void setOpenchannel(String openchannel) {
        this.openchannel = openchannel;
    }

    public String getDeviceNum() {
        return deviceNum;
    }

    public void setDeviceNum(String deviceNum) {
        this.deviceNum = deviceNum;
    }
}