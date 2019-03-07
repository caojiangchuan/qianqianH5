
package com.tongc.common.utils;


import com.ibm.icu.text.SimpleDateFormat;
import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateFormatUtils;
import org.apache.commons.lang.time.DateUtils;

import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;


/**
 * 常用日期格式
 */
public class CalendarUtils {

	/** 完整日期时间无间隔格式 */
	public static final String LONG_FORMAT = "yyyyMMddHHmmss";
	/** 日期无间隔格式 */
	public static final String SHORT_FORMAT = "yyyyMMdd";
	/** 无间隔时间格式 */
	public static final String SHORT_FORMAT_TIME="HHmmss";
	/** 完整日期时间横线与冒号分隔格式 */
	public static final String LONG_FORMAT_LINE="yyyy-MM-dd HH:mm:ss";
	/** 横线分隔日期格式 */
	public static final String SHORT_FORMAT_LINE="yyyy-MM-dd";
	/** 冒号分隔时间格式 */
	public static final String SHORT_FORMAT_TIME_COLON="HH:mm:ss";
	/**
	 * 无间隔天格式
	 */
	public static final String SHORT_FORMAT_DAY = "ddHHmmss";
	
	public static Calendar parseCalendar(String str, String... parsePatterns) {
		Calendar cal = Calendar.getInstance();
		try {
			if (ArrayUtils.isEmpty(parsePatterns)) {
				cal.setTime(DateUtils.parseDate(str, new String[]{LONG_FORMAT_LINE}));
			} else {
				cal.setTime(DateUtils.parseDate(str, parsePatterns));
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return cal;
	}
	
	public static String parsefomatCalendar(Calendar cal, String parsePattern) {
		if (cal == null) {
			return "";
		}
		String str = "";
		if (StringUtils.isEmpty(parsePattern)) {
			str = DateFormatUtils.format(cal.getTimeInMillis(), LONG_FORMAT_LINE);
		} else {
			str = DateFormatUtils.format(cal.getTimeInMillis(), parsePattern);
		}
		return str;
	}
	
	public static Calendar parseCalendar(Calendar cal, String parsePattern){
		if (cal == null) {
			return null;
		}
		String strCal = parsefomatCalendar(cal, parsePattern);
		return parseCalendar(strCal,parsePattern);
	}
	
	public static Calendar getNextDay(Calendar cal) {
		cal.set(Calendar.DAY_OF_YEAR, cal.get(Calendar.DAY_OF_YEAR) + 1);
		return cal;
	}
	
	public static String getFormatNow(){
		return parsefomatCalendar(Calendar.getInstance(), CalendarUtils.LONG_FORMAT);
	}
	public static String getShortFormatNow(){
		return parsefomatCalendar(Calendar.getInstance(), CalendarUtils.SHORT_FORMAT);
	}
	
	public static String getFormatNow(String parsePattern){
		return parsefomatCalendar(Calendar.getInstance(), parsePattern);
	}
	
	/**
	 * 
	 * getNature:(获取月自然月). <br/>
	 *
	 * @author chenhf@yuminsoft.com
	 * @date: 2017年7月3日 下午1:44:55 
	 * @return
	 * @throws ParseException 
	 */
	public static Date getNature(Date date) throws ParseException{
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Calendar calendar=Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.MONTH, 2);
		calendar.set(Calendar.DATE, 0); 
		String format = sdf.format(calendar.getTime()).substring(0,10)+" 23:59:59";
		Date parse = sdf.parse(format);
		return parse;
	
	}
}
