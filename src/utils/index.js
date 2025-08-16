const utils = {
  // 防抖
  debounce: (func, wait, immediate) => {
		let timeout, args, context, timestamp, result

		const later = function() {
			// 据上一次触发时间间隔
			const last = +new Date() - timestamp

			// 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
			if (last < wait && last > 0) {
				timeout = setTimeout(later, wait - last)
			} else {
				timeout = null
				// 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
				if (!immediate) {
					result = func.apply(context, args)
					if (!timeout) context = args = null
				}
			}
		}

		return function(...args) {
			context = this
			timestamp = +new Date()
			const callNow = immediate && !timeout
			// 如果延时不存在，重新设定延时
			if (!timeout) timeout = setTimeout(later, wait)
			if (callNow) {
				result = func.apply(context, args)
				context = args = null
			}

			return result
		}
	},

  // 节流
  throttle: (func, wait, options = {}) => {
		let timeout, context, args, result;
		let previous = 0;

		const later = function() {
			previous = options.leading === false ? 0 : +new Date();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		};

		return function(...params) {
			const now = +new Date();
			if (!previous && options.leading === false) previous = now;

			const remaining = wait - (now - previous);
			context = this;
			args = params;

			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = now;
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}

			return result;
		};
	},
}

export default utils;