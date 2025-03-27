const {withSentryConfig} = require ("sentry/nextjs")

const moduleExports ={
    // Yor Existing Next js config is here
}

const SentrywebpackPluginOptions = {
   silent : true    // Success All logs
}

module.exports = withSentryConfig(SentrywebpackPluginOptions, moduleExports)