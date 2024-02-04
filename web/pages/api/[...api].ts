import { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'

const API_URL: string = process.env.API_URL ? process.env.API_URL : 'http://localhost:8000'

const proxy: httpProxy = httpProxy.createProxyServer()

// Make sure that we don't parse JSON bodies on this route:
export const config = {
  api: {
    bodyParser: false,
  },
}

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  return new Promise((resolve, reject) => {
    proxy.web(req, res, { target: API_URL, changeOrigin: true }, (err) => {
      if (err) {
        return reject(err)
      }
      resolve()
    })
  })
}