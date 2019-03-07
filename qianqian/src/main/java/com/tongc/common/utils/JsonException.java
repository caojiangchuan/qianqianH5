package com.tongc.common.utils;

import com.alibaba.fastjson.JSON;
import com.ibm.icu.text.SimpleDateFormat;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

@Slf4j
public class JsonException extends Exception {
	
    private static final long serialVersionUID = -3827862017476307468L;

    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");

    private String code;

    private String msg;

    private String msgEx;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getMsgEx() {
        return msgEx;
    }

    public void setMsgEx(String msgEx) {
        this.msgEx = msgEx;
    }



    public JsonException(String code, String msg) {
        super("[" + code + "]" + msg);
        this.code = code;
        this.msg = msg;
        this.msgEx = msg;
    }

    public JsonException(String msg) {
        super(msg);
    }

    public static String toJson(JsonException je, Long logId) {
        log.info(logId + "返回:" + je.getCode() + "->" + je.getMsg());
        if (logId != null) {

        }
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("code", "0001");
        param.put("msg", je.getMsg());

        Map<String, Object> returnMsg = new HashMap<String, Object>();
        returnMsg.put("status", je.getCode());
        returnMsg.put("respDesc", je.getMsg());
        returnMsg.put("infos", null);

        param.put("msgEx", returnMsg);

        String returnStr = JSONObject.fromObject(param).toString();

        log.info(logId + returnStr);

        return returnStr;
    }


    public static String toJson(BussErrorCode bussErrorCode) {
        return toJson(bussErrorCode, null);
    }

    public static String toJson(BussErrorCode bussErrorCode, Long logId) {
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("code", bussErrorCode.getErrorcode());

        Map<String, Object> returnMsg = new HashMap<String, Object>();
        returnMsg.put("status", BussErrorCode.ERROR_CODE_0000.getErrorcode().equals(bussErrorCode.getErrorcode())? "0" :"-1");
        returnMsg.put("respDesc", bussErrorCode.getErrordesc());
        returnMsg.put("infos", new HashMap<String, Object>());

        param.put("msgEx", returnMsg);

        String returnStr = JSONObject.fromObject(param).toString();

        log.info(logId + returnStr);

        return returnStr;
    }

    public static String toBusiExceptionJsonStr(String desc) {
        return JsonException.toJsonStr(BussErrorCode.ERROR_CODE_0000.getErrorcode(),
                AppConstants.Status.EXCEPTION,
                desc, null, null);
    }

    public static String toSuccessJsonStr(String desc, Object obj) {
        return JsonException.toJsonStr(BussErrorCode.ERROR_CODE_0000.getErrorcode(),
                AppConstants.Status.SUCCESS,
                desc, obj, null);
    }


    public static String toJsonStr(String code, String status, String desc, Object obj, Long logId) {
        Map<String, Object> msg = new HashMap<String, Object>();
        msg.put("status", status);
        msg.put("respDesc", desc);
        msg.put("infos", (obj != null&&!"".equals(obj)) ? obj : new HashMap<String, Object>());

        Map<String, Object> param = new HashMap<String, Object>();
        param.put("code", code);
        param.put("msgEx", msg);

        String returnStr = JSON.toJSONString(param);
        return returnStr;
    }
}
