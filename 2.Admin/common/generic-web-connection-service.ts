class genericWebConnectionService {
    http: ng.IHttpService;
    q: ng.IQService;
    sessionVariable: any;


    constructor($http: ng.IHttpService, $window, private $q: ng.IQService, private globalVariableFactory: globalVariableFactory) {
        this.http = $http;
        this.q = $q;
    }

    public postRequest<T>(url: string, data: any, isExternal = false): ng.IPromise<T> {
        return this.loadRequest('POST', url, data, isExternal);
    }

    public getRequest<T>(url: string, data: any, isExternal = false): ng.IPromise<T> {
        return this.loadRequest('GET', url, data, isExternal);
    }

    public downloadGetRequest(url: string, data: any): any {
        return this.loadDownloadRequest('GET', url, data);
    }

    public downloadPostRequest(url: string, data: any): any {
        return this.loadDownloadRequest('POST', url, data);
    }
    public loadRequest<T>(method: string, url: string, data: any, isExternal = false): ng.IPromise<T> {
        var self = this;
        var deferred: any = this.q.defer();

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
            .then(function (response: any) { // success function
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
    }

    public loadDownloadRequest(method: string, url: string, data: any): any {
        var self = this;

        var deferred: any = this.q.defer();

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
            .then(function (response: any) { // success function
                deferred.resolve(response);
            })
            .catch(function (err) {
                deferred.reject(err);
            })


        return deferred.promise;
    }


    public loadDownloadRequestDirect(method: string, url: string, data: any): any {
        var self = this;

        var deferred: any = this.q.defer();

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
            .then(function (response: any) { // success function
                // Check if the response has a content-disposition header indicating a file attachment
                const contentDisposition = response.headers('Content-Disposition');
                const contentType = response.headers('Content-Type');
                console.log(contentType);
                console.log(contentDisposition);

                if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
                    // Extract filename from Content-Disposition header
                    //const filename = contentDisposition.split('filename=')[1].replace(/"/g, '');

                    let filename = '';

                    // Try to extract filename from Content-Disposition header
                    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    const matches = filenameRegex.exec(contentDisposition);

                    if (matches != null && matches[1]) {
                        filename = matches[1].replace(/['"]/g, ''); // Remove quotes if any
                    }

                    // Check if the filename*=UTF-8 is present and properly decode it
                    const utf8FilenameRegex = /filename\*\=UTF-8''(.*)/;
                    const utf8Matches = utf8FilenameRegex.exec(contentDisposition);

                    if (utf8Matches != null && utf8Matches[1]) {
                        filename = decodeURIComponent(utf8Matches[1]);
                    }

                    // Create a Blob from the response data
                    const blob = new Blob([response.data], { type: contentType });
                    const url = window.URL.createObjectURL(blob);

                    // Create a link element to trigger the download
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);

                    deferred.resolve('File downloaded');
                } else {
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
    }
}
