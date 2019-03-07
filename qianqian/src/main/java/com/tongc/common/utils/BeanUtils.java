package com.tongc.common.utils;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

/***
 * 实体类公共方法
 */
public class BeanUtils {
	
	/***
	 * Bean转换成Map
	 */
	public static Map<String,Object> transBeanToMap(Object bean) throws Exception {
		try {
			Class type = bean.getClass();
			Map<String,Object> returnMap = new HashMap<String,Object>();
			BeanInfo beanInfo = Introspector.getBeanInfo(type);
			PropertyDescriptor[] propertyDescriptors =  beanInfo.getPropertyDescriptors();
			for (int i = 0; i< propertyDescriptors.length; i++) {
				PropertyDescriptor descriptor = propertyDescriptors[i];
				String propertyName = descriptor.getName();
				if (!propertyName.equals("class")) {
					Method readMethod = descriptor.getReadMethod();
					Object result = readMethod.invoke(bean, new Object[0]);
					if (result != null) {
						returnMap.put(propertyName, result);
					}
				}
			}
			return returnMap;
		} catch(Exception ex) {
			throw new Exception("转换异常");
		}
	}
	
	/**
	 * 将一个Map转换成bean
	 */
	public static Object transMapToBean(Map<String, Object> map, Class<?> clazz) throws Exception {  
		Object obj=null;
		try {  
            BeanInfo beanInfo = Introspector.getBeanInfo(clazz);
            obj=clazz.newInstance();
            PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();  
  
            for (PropertyDescriptor property : propertyDescriptors) {  
                String key = property.getName();  
  
                if (map.containsKey(key)) {  
                    Object value = map.get(key);  
                    Method setter = property.getWriteMethod();//得到property对应的setter方法  
                    setter.invoke(obj, value);  
                }  
            }  
        } catch (Exception e) {  
        	throw new Exception("转换异常");
        }
        return obj;
    }
	
}
