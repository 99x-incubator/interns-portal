(function() {
    'use strict';

    angular.module('BlurAdmin.S3UploadService', [])
        .service('S3UploadService', ['$q', function($q) {
            // Us standard region
            AWS.config.region = 'us-east-1';
            AWS.config.update({ accessKeyId: 'AKIAJQFZMNLUKZXHGGGQ', secretAccessKey: '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' });

            var bucket = new AWS.S3({ params: { Bucket: '99xt-interns-uploads', maxRetries: 10 }, httpOptions: { timeout: 360000 } });

            this.Progress = 0;
            this.Upload = function (file) {
                var deferred = $q.defer();
                var params = { Bucket: '99xt-interns-uploads/profile', Key: file.name, ContentType: file.type, Body: file };
                var options = {
                    // Part Size of 10mb
                    partSize: 10 * 1024 * 1024,
                    queueSize: 1,
                    // Give the owner of the bucket full control
                    ACL: 'bucket-owner-full-control'
                };
                var uploader = bucket.upload(params, options, function(err, data) {
                    if (err) {
                        deferred.reject(err);
                    }
                    deferred.resolve();
                });
                uploader.on('httpUploadProgress', function(event) {
                    deferred.notify(event);
                });

                return deferred.promise;
            };
        }]);


})();
