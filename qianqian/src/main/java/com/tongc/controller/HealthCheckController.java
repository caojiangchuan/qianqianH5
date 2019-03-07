package com.tongc.controller;

import com.tongc.common.config.ProfileParamBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

/**
 * Created by spark on 16/8/22.
 */

@Controller
/* @Scope("singleton") */
@RequestMapping(value = "/api")
public class HealthCheckController {
	@RequestMapping(value="/heartbeat")
	@ResponseBody
	public String healthCheck() throws Exception {

		return "OK";
	}

}
