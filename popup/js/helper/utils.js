//////////////////////////////////////////
// UTILITY / HELPER FUNCTIONS           //
//////////////////////////////////////////

/**
 * Deep merge objects without mutation
 *
 * @see https://stackoverflow.com/a/37164538
 */
export function mergeDeep(target, source) {
  let output = Object.assign({}, target)
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] })
        else output[key] = mergeDeep(target[key], source[key])
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }
  return output
}

export function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Get text how long a date is ago
 *
 * @see https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
 */
export function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + ' years'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' months'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' days'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' hours'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' minutes'
  }
  return Math.floor(seconds) + ' seconds'
}

/**
 * Remove http:// or http:// and www from URLs
 * Remove trailing slashes
 * @see https://stackoverflow.com/a/57698415
 */
export function cleanUpUrl(url) {
  return url
    .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
    .replace(/\/$/, '')
    .toLowerCase()
}

/**
 * Dynamically load a Javascript file
 */
export async function loadScript(url) {
  return new Promise(function (resolve) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.onload = resolve
    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)
  })
}
