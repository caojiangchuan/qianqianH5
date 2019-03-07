package com.tongc.common.utils;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.Random;


public class NumberUtil {
	
	public static String getNumberFormat(String value){
		if(value == null || "".equals(value))
			value = "0";
		
		DecimalFormat formatter = new DecimalFormat("###,##0.00"); 
		formatter.setRoundingMode(RoundingMode.FLOOR);
		
		BigDecimal num = new BigDecimal(value);
		
		return formatter.format(num);
	}
	
	public static String getRateFormat(String value){
		if(value == null || "".equals(value))
			value = "0";
		
		DecimalFormat formatter = new DecimalFormat("###,##0.00%"); 
		formatter.setRoundingMode(RoundingMode.FLOOR);
		
		BigDecimal num = new BigDecimal(value);
		
		return formatter.format(num);
	}
	
	
	public static String getNumberFormat3(String value){
		if(value == null || "".equals(value))
			value = "0";
		
		DecimalFormat formatter = new DecimalFormat("###,###"); 
		
		BigDecimal num = new BigDecimal(value);
		
		return formatter.format(num);
	}

	public static String getNumberFormat1(BigDecimal value)
	{
		if (value.compareTo(new BigDecimal(0)) == 0)
			return "0";

		DecimalFormat df = new DecimalFormat("#,###.##");
		return df.format(value);

	}

	
	//保留两位小数
	public static String getNumberFormat4(String value){
		if(value == null || "".equals(value))
			value = "0";
		
		DecimalFormat formatter = new DecimalFormat("##0.00"); 
		formatter.setRoundingMode(RoundingMode.FLOOR);
		
		BigDecimal num = new BigDecimal(value);
		
		return formatter.format(num);
	}
	
	/**
	 * 利率不加%号（乘100不截位）
	 * @param value
	 * @return
	 */
	public static String getRateFormat2(String value){
		if(value == null || "".equals(value))
			value = "0";
		
		BigDecimal num = new BigDecimal(value);
		num = num.multiply(new BigDecimal(100));
		
		return String.valueOf(num.doubleValue());
	}
	

	/**
	 * 利率加%号（乘100不截位）
	 * @param value
	 * @return
	 */
	public static String getRateFormat3(String value){
		if(value == null || "".equals(value))
			value = "0";
		
		BigDecimal num = new BigDecimal(value);
		num = num.multiply(new BigDecimal(100));
		
		return num.doubleValue()+"%";
	}

	/**
	 * 将value 除以10000,当value大于100时保留二位小数,小于100时,保留4位小数,返回值带千位符
	 * @param value
	 * @return
	 */
	public static String getDivid10000Formt(BigDecimal value)
	{
		if (value.compareTo(new BigDecimal(0)) == 0)
			return "0";

		int scaleNum = 2;
		String scaleFmt ="#,###.##";
		if (value.compareTo(new BigDecimal(100)) <= 0)
		{
			scaleFmt = "#,###.####";
			scaleNum = 4;
		}

		DecimalFormat df = new DecimalFormat(scaleFmt);
		BigDecimal showVale = value.divide(new BigDecimal(10000)).setScale(scaleNum, BigDecimal.ROUND_DOWN);
		return  df.format(showVale);
	}



	public static Integer stringToInteger(String num,Integer defaultVal)
	{
		Integer returnVal = 0;
		try{
			returnVal = Integer.parseInt(num);
		}
		catch (Exception e){
			returnVal = defaultVal;
		}
		return returnVal;

	}

	public static String getRandNum(){
		Random ne=new Random();//实例化一个random的对象ne
		return String.valueOf(ne.nextInt(9999-1000+1)+1000);
	}
	
	
	
	public static void main(String[] args){



		System.out.println(getDivid10000Formt(new BigDecimal(9)));
		System.out.println(getDivid10000Formt(new BigDecimal(98)));
		System.out.println(getDivid10000Formt(new BigDecimal(198)));
		System.out.println(getDivid10000Formt(new BigDecimal(1198)));
		System.out.println(getDivid10000Formt(new BigDecimal(11198)));
		System.out.println(getDivid10000Formt(new BigDecimal(11298)));


		System.out.println(getNumberFormat1(new BigDecimal(0.12)));
		System.out.println(getNumberFormat1(new BigDecimal(10)));
	}

}
