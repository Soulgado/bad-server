import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
})

export default limiter