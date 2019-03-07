package com.tongc.common.utils;

/**
 * 常量及通用配置
 */
public class AppConstants {

    public static String returnException() {
        return "{\"status\":\"-1\",\"respDesc\":\"系统异常\"}";
    }

    public static String returnParamException() {
        return "{\"status\":\"-2\",\"respDesc\":\"请求参数或参数格式不正确! \"}";
    }


    public static class Status {
        public static final String SUCCESS = "0";
        public static final String EXCEPTION = "-1";
    }

    /**
     * 客户端常量类
     */
    public static class Client {

        public static final String IOS = "LCB-IOS";

        public static final String ANDROID = "LCB-Android";

        public static final String PC = "LCB-PC";

        public static final String MANAGER = "LCB-Manager";

        public static final String WECHAT = "LCB-Wechat";

        public static final String TOUCH = "LCB-Touch";

        public static final String LOTTERY = "LCB-Lottery";

        public static final String CASH = "LCB-Cash";
    }

    /**
     * 平台常量
     */
    public static class Platform {

        public static final String APP = "APP";

        public static final String WEB = "WEB";

        public static final String WAP = "WAP";

        public static final String WECHAT = "WECHAT";

        public static final String TOUCH = "TOUCH";

        public static final String LOTTERY = "LOTTERY";

        public static final String MANAGE = "MANAGE";

        public static final String CASH = "CASH";
    }

    /**
     * 系统常量
     */
    public static class System {
        public static final String TRADE = "1000001";
    }

    public static class SystemPubStatus {
        public static final String PUBLISHING = "0";

        public static final String PUBLISHED = "1";
    }
}
