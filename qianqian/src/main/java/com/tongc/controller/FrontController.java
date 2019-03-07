package com.tongc.controller;

import com.alibaba.fastjson.JSONObject;
import com.tongc.common.config.ProfileParamBean;
import com.tongc.common.utils.*;
import com.tongc.service.RequestService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

/**
 * Created by spark on 2018/3/28.
 */

@Controller
@RequestMapping(value = "/front")
@Slf4j
public class FrontController {

    @Autowired
    private ProfileParamBean profileParamBean;

    @Autowired
    private RequestService requestService;


    @RequestMapping(value = "/requestApi")
    @ResponseBody
    public String requestApi(@RequestParam("arg0") String arg0,
                             @RequestParam("arg1") String arg1){

        String url = profileParamBean.getCustomerCreditGateway();

        Map<String, Object> param = new HashMap<>();
        JSONObject jsonObject = JSONObject.parseObject(arg1);
        Set<String> keyList = jsonObject.keySet();
        // 遍历jsonObject数据，添加到Map对象
        for (String key : keyList)
        {
            String value = (String) jsonObject.get(key);
            param.put(key, value);
        }

        try {
            log.info("Request route address  【{}】",url);
            log.info("Request method 【{}】 , param 【{}】",arg0,arg1);

            String res = requestService.requestRemoteService("",arg0,param);
            log.info("Response 【{}】",res.toString());
            return res.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return JsonException.toJson(BussErrorCode.ERROR_CODE_0102, null);
        }
    }
    
    @RequestMapping(value = "/requestApi4Stream")
    public String requestApi4Stream(@RequestParam("arg0") String arg0,
                             @RequestParam("arg1") String arg1,HttpServletResponse httpResponse){

        String url = profileParamBean.getCustomerCreditGateway();

        Map<String, Object> param = new HashMap<>();
        JSONObject jsonObject = JSONObject.parseObject(arg1);
        Set<String> keyList = jsonObject.keySet();
        // 遍历jsonObject数据，添加到Map对象
        for (String key : keyList)
        {
            String value = (String) jsonObject.get(key);
            param.put(key, value);
        }
        try {
            log.info("Request route address  【{}】",url);
            log.info("Request method 【{}】 , param 【{}】",arg0,arg1);

            String res = requestService.requestRemoteService("",arg0,param);
            if(res!=null && !"".equals(res)){
				net.sf.json.JSONObject respModel =net.sf.json.JSONObject.fromObject(res);
				byte[] buffer = org.apache.commons.codec.binary.Base64.decodeBase64(respModel.getString("contractContent").getBytes());
				ByteArrayInputStream in = new ByteArrayInputStream(buffer);
				ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream(1024);
				try {
					byte[] bytes = new byte[1024];
					int i = 0;
					while((i = in.read(bytes))!=-1){
						byteArrayOutputStream.write(bytes,0,i);
					}
					byteArrayOutputStream.writeTo(httpResponse.getOutputStream());
					byteArrayOutputStream.close();
					return "success";
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
            return res.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return JsonException.toJson(BussErrorCode.ERROR_CODE_0102, null);
        }
    }
}
