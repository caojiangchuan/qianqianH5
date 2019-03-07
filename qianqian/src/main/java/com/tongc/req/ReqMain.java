/*
* Copyright (c) 2015 zendaimoney.com. All Rights Reserved.
*/
package com.tongc.req;

import java.io.Serializable;
import java.util.Map;

/**
 * ReqMain
 * <p/>
 * Author: Hao Chen
 * Date: 2015/6/29 15:04
 * Mail: haoc@zendaimoney.com
 * $Id$
 */
public class ReqMain implements Serializable {

    private Map<String,Object> reqParam;

    private ReqHeadParam reqHeadParam;

    private String sign;

    private String sn;

    private String reqUrl;

    private String projectNo;

    private String reqTimestamp;

    private String version;

    private String deviceNum;

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getDeviceNum() {
        return deviceNum;
    }

    public void setDeviceNum(String deviceNum) {
        this.deviceNum = deviceNum;
    }

    public ReqHeadParam getReqHeadParam() {
        return reqHeadParam;
    }

    public void setReqHeadParam(ReqHeadParam reqHeadParam) {
        this.reqHeadParam = reqHeadParam;
    }

    public Map<String,Object> getReqParam() {
        return reqParam;
    }

    public void setReqParam(Map<String,Object> reqParam) {
        this.reqParam = reqParam;
    }

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }

    public String getSn() {
        return sn;
    }

    public void setSn(String sn) {
        this.sn = sn;
    }

    public String getReqUrl() {
        return reqUrl;
    }

    public void setReqUrl(String reqUrl) {
        this.reqUrl = reqUrl;
    }

    public String getProjectNo() {
        return projectNo;
    }

    public void setProjectNo(String projectNo) {
        this.projectNo = projectNo;
    }

    public String getReqTimestamp() {
        return reqTimestamp;
    }

    public void setReqTimestamp(String reqTimestamp) {
        this.reqTimestamp = reqTimestamp;
    }
}