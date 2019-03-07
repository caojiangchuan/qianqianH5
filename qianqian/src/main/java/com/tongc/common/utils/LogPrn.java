/*
 * Copyright 2012 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */
package com.tongc.common.utils;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.Serializable;

/**
 * 日志工具类
 * 
 * @author liuyi
 * 
 */
public class LogPrn implements Serializable {
	private static final long serialVersionUID = 8033811456249864050L;
	private transient Log prnLog = null;

	/**
	 * 构造函数，带调用类名
	 * 
	 * @param className
	 */
	public LogPrn(final String className) {
		prnLog = LogFactory.getLog(className);
	}

	/**
	 * 构造函数，带调用类参数构造
	 * 
	 * @param c
	 */
	public LogPrn(Class c) {
		prnLog = LogFactory.getLog(c);
	}

	/**
	 * 判断是否可以输出debug级别调试信息
	 * 
	 * @return
	 */
	public boolean isDebugEnable() {
		return prnLog.isDebugEnabled();
	}

	/**
	 * 判断是否可以输出info级别调试信息
	 * 
	 * @return
	 */
	public boolean isInfoEnable() {
		return prnLog.isInfoEnabled();
	}

	/**
	 * 判断是否可以输出warn级别调试信息
	 * 
	 * @return
	 */
	public boolean isWarnEnable() {
		return prnLog.isWarnEnabled();
	}

	/**
	 * 判断是否可以输出error级别调试信息
	 * 
	 * @return
	 */
	public boolean isErrorEnable() {
		return prnLog.isErrorEnabled();
	}

	/**
	 * 判断是否可以输出fatal级别调试信息
	 * 
	 * @return
	 */
	public boolean isFatalEnable() {
		return prnLog.isFatalEnabled();
	}

	/**
	 * 判断是否可以输出trace级别调试信息
	 * 
	 * @return
	 */
	public boolean isTraceEnable() {
		return prnLog.isTraceEnabled();
	}

	/**
	 * 输出trace级别的调试信息
	 * 
	 * @param message
	 */
	public void trace(Object message) {
		prnLog.trace(message);
	}

	/**
	 * 输出trace级别的调试信息
	 * 
	 * @param message
	 * @param t
	 *            异常对象参数，将打印该异常对象堆栈信息
	 */
	public void trace(Object message, Throwable t) {
		prnLog.trace(message, t);
	}

	/**
	 * 输出debug级别的调试信息
	 * 
	 * @param message
	 */
	public void debug(Object message) {
		prnLog.debug(message);
	}

	/**
	 * 输出debug级别的调试信息
	 * 
	 * @param message
	 * @param t
	 *            异常对象参数，将打印该异常对象堆栈信息
	 */
	public void debug(Object message, Throwable t) {
		prnLog.debug(message, t);
	}

	/**
	 * 输出INFO级别的调试信息
	 * 
	 * @param message
	 */
	public void info(Object message) {
		prnLog.info(message);
	}

	/**
	 * 输出INFO级别的调试信息
	 * 
	 * @param message
	 *            调试信息
	 * @param t
	 *            异常对象参数，将打印该异常对象堆栈信息
	 */
	public void info(Object message, Throwable t) {
		prnLog.info(message, t);
	}

	/**
	 * 输出WARN级别的调试信息
	 * 
	 * @param message
	 *            调试信息
	 */
	public void warn(Object message) {
		prnLog.warn(message);
	}

	/**
	 * 输出WARN级别的调试信息
	 * 
	 * @param message
	 *            调试信息
	 * @param t
	 *            异常对象参数，将打印该异常对象堆栈信息
	 */
	public void warn(Object message, Throwable t) {
		prnLog.warn(message, t);
	}

	/**
	 * 输出ERROR级别的调试信息
	 * 
	 * @param message
	 */
	public void error(Object message) {
		prnLog.error(message);
	}

	/**
	 * 输出ERROR级别的调试信息
	 * 
	 * @param message
	 *            调试信息
	 * @param t
	 *            异常对象参数，将打印该异常对象堆栈信息
	 */
	public void error(Object message, Throwable t) {
		prnLog.error(message, t);
	}

	/**
	 * 输出FATAL级别的调试信息
	 * 
	 * @param message
	 *            调试信息
	 */
	public void fatal(Object message) {
		prnLog.fatal(message);
	}

	/**
	 * 输出FATAL级别的调试信息
	 * 
	 * @param message
	 *            调试信息
	 * @param t
	 *            异常对象参数，将打印该异常对象堆栈信息
	 */
	public void fatal(Object message, Throwable t) {
		prnLog.fatal(message, t);
	}
}
