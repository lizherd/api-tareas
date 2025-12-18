export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

 
  const $fetch = $fetch.create({
    baseURL: config.public.apiBase,
    headers: {
      Authorization: `Bearer ${config.public.apiToken}`,
    },
    onRequest({ request, options }) {
      console.log(`[API Request] ${options.method} ${request}`)
    },
    onResponse({ response }) {
      console.log(`[API Response] ${response.status} ${response.url}`)
    },
    onResponseError({ response }) {
      console.error(`[API Error] ${response.status} ${response.url}`)
    },
  })

  return {
    provide: {
      api: $fetch,
    },
  }
})
