var genericWebConnectionService = /** @class */ (function () {
    function genericWebConnectionService($http, $window, $q, globalVariableFactory) {
        this.$q = $q;
        this.globalVariableFactory = globalVariableFactory;
        this.http = $http;
        this.q = $q;
    }
    genericWebConnectionService.prototype.postRequest = function (url, data, isExternal) {
        if (isExternal === void 0) { isExternal = false; }
        return this.loadRequest('POST', url, data, isExternal);
    };
    genericWebConnectionService.prototype.getRequest = function (url, data, isExternal) {
        if (isExternal === void 0) { isExternal = false; }
        return this.loadRequest('GET', url, data, isExternal);
    };
    genericWebConnectionService.prototype.downloadGetRequest = function (url, data) {
        return this.loadDownloadRequest('GET', url, data);
    };
    genericWebConnectionService.prototype.downloadPostRequest = function (url, data) {
        return this.loadDownloadRequest('POST', url, data);
    };
    genericWebConnectionService.prototype.loadRequest = function (method, url, data, isExternal) {
        if (isExternal === void 0) { isExternal = false; }
        var self = this;
        var deferred = this.q.defer();
        this.http({
            method: method,
            url: isExternal ? url : self.globalVariableFactory.serverUrl + url,
            dataType: 'json',
            contentType: 'application/json',
            timeout: 600000,
            data: data,
            headers: {
                'Content-Type': 'application/json' // <-- Important, since you are posting JSON
            }
        })
            .then(function (response) {
            deferred.resolve(response.data);
        })
            .catch(function (err) {
            deferred.reject(err);
        })
            .finally(function () {
            if (deferred.finally)
                deferred.finally();
        });
        return deferred.promise;
    };
    genericWebConnectionService.prototype.loadDownloadRequest = function (method, url, data) {
        var self = this;
        var deferred = this.q.defer();
        this.http({
            method: method,
            url: self.globalVariableFactory.serverUrl + url,
            dataType: 'json',
            contentType: 'application/json',
            timeout: 600000,
            cache: false,
            data: data,
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json' // <-- Important, since you are posting JSON
            }
        })
            .then(function (response) {
            deferred.resolve(response);
        })
            .catch(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    genericWebConnectionService.prototype.loadDownloadRequestDirect = function (method, url, data) {
        var self = this;
        var deferred = this.q.defer();
        this.http({
            method: method,
            url: url,
            dataType: 'json',
            contentType: 'application/json',
            timeout: 600000,
            cache: false,
            data: data,
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json' // <-- Important, since you are posting JSON
            }
        })
            .then(function (response) {
            // Check if the response has a content-disposition header indicating a file attachment
            var contentDisposition = response.headers('Content-Disposition');
            var contentType = response.headers('Content-Type');
            console.log(contentType);
            console.log(contentDisposition);
            if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
                // Extract filename from Content-Disposition header
                //const filename = contentDisposition.split('filename=')[1].replace(/"/g, '');
                var filename = '';
                // Try to extract filename from Content-Disposition header
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(contentDisposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, ''); // Remove quotes if any
                }
                // Check if the filename*=UTF-8 is present and properly decode it
                var utf8FilenameRegex = /filename\*\=UTF-8''(.*)/;
                var utf8Matches = utf8FilenameRegex.exec(contentDisposition);
                if (utf8Matches != null && utf8Matches[1]) {
                    filename = decodeURIComponent(utf8Matches[1]);
                }
                // Create a Blob from the response data
                var blob = new Blob([response.data], { type: contentType });
                var url_1 = window.URL.createObjectURL(blob);
                // Create a link element to trigger the download
                var a = document.createElement('a');
                a.href = url_1;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url_1);
                deferred.resolve('File downloaded');
            }
            else {
                // If not a file, resolve normally
                deferred.resolve(response.data);
            }
        })
            .catch(function (err) {
            deferred.reject(err);
        })
            .finally(function () {
            // Optional: Any cleanup tasks can be added here
        });
        return deferred.promise;
    };
    return genericWebConnectionService;
}());
