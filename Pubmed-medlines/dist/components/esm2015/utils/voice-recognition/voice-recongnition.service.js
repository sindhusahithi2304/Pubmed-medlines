import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/intl";
import * as i2 from "@sinequa/core/notification";
export class VoiceRecognitionService {
    constructor(intlService, notify) {
        this.intlService = intlService;
        this.notify = notify;
        this.recognizing = false;
        this.ignore_onend = false;
        this.text = new Subject();
        this.started = new Subject();
        this.available = false;
        this.onResult = e => {
            const transcript = Array.from(e.results)
                .map((result) => result[0])
                .map(result => result.transcript)
                .join("");
            this.text.next(transcript);
        };
        this.onStart = event => {
            this.recognizing = true;
            this.start_timestamp = event.timeStamp;
        };
        this.onEnd = () => {
            if (this.ignore_onend) {
                return;
            }
            this.recognizing = false;
            this.started.next(false);
        };
        this.onError = event => {
            let message = event.error;
            switch (event.error) {
                case "no-speech": {
                    message = "No speech was detected.";
                    break;
                }
                case "audio-capture": {
                    message = "Audio capture failed.";
                    break;
                }
                case "not-allowed": {
                    if (event.timeStamp - this.start_timestamp < 100) {
                        message = "info_blocked";
                    }
                    else {
                        message = "The user agent is not allowing any speech input to occur for reasons of security, privacy or user preference.";
                    }
                    break;
                }
                case "aborted":
                    {
                        message = "Speech input was aborted somehow, maybe by some user-agent-specific behavior such as UI that lets the user cancel speech input.";
                        break;
                    }
                    ;
                case "network": {
                    message = "Some network communication that was required to complete the recognition failed.";
                    break;
                }
                case "service-not-allowed": {
                    message = "The user agent is not allowing the web application requested speech service, but would allow some speech service, to be used either because the user agent doesn’t support the selected one or because of reasons of security, privacy or user preference.";
                    break;
                }
                case "bad-grammar": {
                    message = "There was an error in the speech recognition grammar or semantic tags, or the grammar format or semantic tag format is unsupported.";
                    break;
                }
                case "language-not-supported": {
                    message = `The language [${this.recognition.lang}] was not supported.`;
                    this.recognition.lang = "en-US";
                    break;
                }
            }
            this.notify.warning(message);
            this.ignore_onend = true;
            this.started.next(false);
        };
    }
    init() {
        var _a;
        this.intlService.events.subscribe(() => {
            var _a;
            this.recognition.lang = (_a = this.intlService.currentLocale.data) === null || _a === void 0 ? void 0 : _a.intl.locale;
        });
        try {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = true;
            this.recognition.lang = (_a = this.intlService.currentLocale.data) === null || _a === void 0 ? void 0 : _a.intl.locale;
            this.recognition.addEventListener("error", this.onError);
            this.recognition.addEventListener("result", this.onResult);
            this.recognition.addEventListener("start", this.onStart);
            this.recognition.addEventListener("end", this.onEnd);
            this.available = true;
        }
        catch (error) {
            this.available = false;
        }
    }
    ngOnDestroy() {
        this.recognition.removeEventListener("error", this.onError);
        this.recognition.removeEventListener("result", this.onResult);
        this.recognition.removeEventListener("start", this.onStart);
        this.recognition.removeEventListener("end", this.onEnd);
    }
    start() {
        if (this.recognizing) {
            this.stop();
            return;
        }
        this.text.next("");
        this.started.next(true);
        this.recognition.start();
    }
    stop() {
        this.recognition.stop();
        this.started.next(false);
    }
    toggleRecognition() {
        if (this.recognizing) {
            this.stop();
        }
        else {
            this.start();
        }
    }
}
VoiceRecognitionService.ɵfac = function VoiceRecognitionService_Factory(t) { return new (t || VoiceRecognitionService)(i0.ɵɵinject(i1.IntlService), i0.ɵɵinject(i2.NotificationsService)); };
VoiceRecognitionService.ɵprov = i0.ɵɵdefineInjectable({ token: VoiceRecognitionService, factory: VoiceRecognitionService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(VoiceRecognitionService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: i1.IntlService }, { type: i2.NotificationsService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9pY2UtcmVjb25nbml0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy91dGlscy8iLCJzb3VyY2VzIjpbInZvaWNlLXJlY29nbml0aW9uL3ZvaWNlLXJlY29uZ25pdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFHcEQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQzs7OztBQVE3QixNQUFNLE9BQU8sdUJBQXVCO0lBVWxDLFlBQ1UsV0FBd0IsRUFDeEIsTUFBNEI7UUFENUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBc0I7UUFWdEMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFHckIsU0FBSSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFDN0IsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7UUFDakMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQTREVixhQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDckIsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2lCQUNyQyxHQUFHLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztpQkFDaEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRVosSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDO1FBRU0sWUFBTyxHQUFHLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxXQUFXLEdB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Q0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNiO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZDtJQUNILENBQUM7OzhGQWxFVSx1QkFBdUI7K0RBQXZCLHVCQUF1QixXQUF2Qix1QkFBdUIsbUJBRnRCLE1BQU07a0RBRVAsdUJBQXVCO2NBSG5DLFVBQVU7ZUFBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgT25EZXN0cm95fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge0ludGxTZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9pbnRsXCI7XHJcbmltcG9ydCB7Tm90aWZpY2F0aW9uc1NlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL25vdGlmaWNhdGlvblwiO1xyXG5pbXBvcnQge1N1YmplY3R9IGZyb20gXCJyeGpzXCI7XHJcblxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdmFyXHJcbmRlY2xhcmUgdmFyIHdlYmtpdFNwZWVjaFJlY29nbml0aW9uOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogXCJyb290XCJcclxufSlcclxuZXhwb3J0IGNsYXNzIFZvaWNlUmVjb2duaXRpb25TZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICByZWNvZ25pdGlvbjtcclxuICByZWNvZ25pemluZyA9IGZhbHNlO1xyXG4gIGlnbm9yZV9vbmVuZCA9IGZhbHNlO1xyXG4gIHN0YXJ0X3RpbWVzdGFtcDtcclxuXHJcbiAgdGV4dCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuICBzdGFydGVkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcclxuICBhdmFpbGFibGUgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGludGxTZXJ2aWNlOiBJbnRsU2VydmljZSxcclxuICAgIHByaXZhdGUgbm90aWZ5OiBOb3RpZmljYXRpb25zU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIHRoaXMuaW50bFNlcnZpY2UuZXZlbnRzLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVjb2duaXRpb24ubGFuZyA9IHRoaXMuaW50bFNlcnZpY2UuY3VycmVudExvY2FsZS5kYXRhPy5pbnRsLmxvY2FsZTtcclxuICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgdGhpcy5yZWNvZ25pdGlvbiA9IG5ldyB3ZWJraXRTcGVlY2hSZWNvZ25pdGlvbigpO1xyXG4gICAgICB0aGlzLnJlY29nbml0aW9uLmNvbnRpbnVvdXMgPSBmYWxzZTtcclxuICAgICAgdGhpcy5yZWNvZ25pdGlvbi5pbnRlcmltUmVzdWx0cyA9IHRydWU7XHJcbiAgICAgIHRoaXMucmVjb2duaXRpb24ubGFuZyA9IHRoaXMuaW50bFNlcnZpY2UuY3VycmVudExvY2FsZS5kYXRhPy5pbnRsLmxvY2FsZTtcclxuXHJcbiAgICAgIHRoaXMucmVjb2duaXRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIHRoaXMub25FcnJvcik7XHJcbiAgICAgIHRoaXMucmVjb2duaXRpb24uYWRkRXZlbnRMaXN0ZW5lcihcInJlc3VsdFwiLCB0aGlzLm9uUmVzdWx0KTtcclxuICAgICAgdGhpcy5yZWNvZ25pdGlvbi5hZGRFdmVudExpc3RlbmVyKFwic3RhcnRcIiwgdGhpcy5vblN0YXJ0KTtcclxuICAgICAgdGhpcy5yZWNvZ25pdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZW5kXCIsIHRoaXMub25FbmQpO1xyXG4gICAgICB0aGlzLmF2YWlsYWJsZSA9IHRydWU7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aGlzLmF2YWlsYWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnJlY29nbml0aW9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCB0aGlzLm9uRXJyb3IpO1xyXG4gICAgdGhpcy5yZWNvZ25pdGlvbi5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzdWx0XCIsIHRoaXMub25SZXN1bHQpO1xyXG4gICAgdGhpcy5yZWNvZ25pdGlvbi5yZW1vdmVFdmVudExpc3RlbmVyKFwic3RhcnRcIiwgdGhpcy5vblN0YXJ0KTtcclxuICAgIHRoaXMucmVjb2duaXRpb24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVuZFwiLCB0aGlzLm9uRW5kKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0KCkge1xyXG4gICAgaWYgKHRoaXMucmVjb2duaXppbmcpIHtcclxuICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRleHQubmV4dChcIlwiKTtcclxuICAgIHRoaXMuc3RhcnRlZC5uZXh0KHRydWUpO1xyXG4gICAgdGhpcy5yZWNvZ25pdGlvbi5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgc3RvcCgpIHtcclxuICAgIHRoaXMucmVjb2duaXRpb24uc3RvcCgpO1xyXG4gICAgdGhpcy5zdGFydGVkLm5leHQoZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlUmVjb2duaXRpb24oKSB7XHJcbiAgICBpZiAodGhpcy5yZWNvZ25pemluZykge1xyXG4gICAgICB0aGlzLnN0b3AoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc3RhcnQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25SZXN1bHQgPSBlID0+IHtcclxuICAgIGNvbnN0IHRyYW5zY3JpcHQgPSBBcnJheS5mcm9tKGUucmVzdWx0cylcclxuICAgICAgLm1hcCgocmVzdWx0OiBhbnkpID0+IHJlc3VsdFswXSlcclxuICAgICAgLm1hcChyZXN1bHQgPT4gcmVzdWx0LnRyYW5zY3JpcHQpXHJcbiAgICAgIC5qb2luKFwiXCIpO1xyXG5cclxuICAgIHRoaXMudGV4dC5uZXh0KHRyYW5zY3JpcHQpO1xyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgb25TdGFydCA9IGV2ZW50ID0+IHtcclxuICAgIHRoaXMucmVjb2duaXppbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5zdGFydF90aW1lc3RhbXAgPSBldmVudC50aW1lU3RhbXA7XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBvbkVuZCA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLmlnbm9yZV9vbmVuZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlY29nbml6aW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLnN0YXJ0ZWQubmV4dChmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBvbkVycm9yID0gZXZlbnQgPT4ge1xyXG4gICAgbGV0IG1lc3NhZ2U6IHN0cmluZyA9IGV2ZW50LmVycm9yO1xyXG4gICAgc3dpdGNoIChldmVudC5lcnJvcikge1xyXG4gICAgICBjYXNlIFwibm8tc3BlZWNoXCI6IHtcclxuICAgICAgICBtZXNzYWdlID0gXCJObyBzcGVlY2ggd2FzIGRldGVjdGVkLlwiO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJhdWRpby1jYXB0dXJlXCI6IHtcclxuICAgICAgICBtZXNzYWdlID0gXCJBdWRpbyBjYXB0dXJlIGZhaWxlZC5cIjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwibm90LWFsbG93ZWRcIjoge1xyXG4gICAgICAgIGlmIChldmVudC50aW1lU3RhbXAgLSB0aGlzLnN0YXJ0X3RpbWVzdGFtcCA8IDEwMCkge1xyXG4gICAgICAgICAgbWVzc2FnZSA9IFwiaW5mb19ibG9ja2VkXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG1lc3NhZ2UgPSBcIlRoZSB1c2VyIGFnZW50IGlzIG5vdCBhbGxvd2luZyBhbnkgc3BlZWNoIGlucHV0IHRvIG9jY3VyIGZvciByZWFzb25zIG9mIHNlY3VyaXR5LCBwcml2YWN5IG9yIHVzZXIgcHJlZmVyZW5jZS5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcImFib3J0ZWRcIjoge1xyXG4gICAgICAgIG1lc3NhZ2UgPSBcIlNwZWVjaCBpbnB1dCB3YXMgYWJvcnRlZCBzb21laG93LCBtYXliZSBieSBzb21lIHVzZXItYWdlbnQtc3BlY2lmaWMgYmVoYXZpb3Igc3VjaCBhcyBVSSB0aGF0IGxldHMgdGhlIHVzZXIgY2FuY2VsIHNwZWVjaCBpbnB1dC5cIlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9O1xyXG4gICAgICBjYXNlIFwibmV0d29ya1wiOiB7XHJcbiAgICAgICAgbWVzc2FnZSA9IFwiU29tZSBuZXR3b3JrIGNvbW11bmljYXRpb24gdGhhdCB3YXMgcmVxdWlyZWQgdG8gY29tcGxldGUgdGhlIHJlY29nbml0aW9uIGZhaWxlZC5cIjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwic2VydmljZS1ub3QtYWxsb3dlZFwiOiB7XHJcbiAgICAgICAgbWVzc2FnZSA9IFwiVGhlIHVzZXIgYWdlbnQgaXMgbm90IGFsbG93aW5nIHRoZSB3ZWIgYXBwbGljYXRpb24gcmVxdWVzdGVkIHNwZWVjaCBzZXJ2aWNlLCBidXQgd291bGQgYWxsb3cgc29tZSBzcGVlY2ggc2VydmljZSwgdG8gYmUgdXNlZCBlaXRoZXIgYmVjYXVzZSB0aGUgdXNlciBhZ2VudCBkb2VzbuKAmXQgc3VwcG9ydCB0aGUgc2VsZWN0ZWQgb25lIG9yIGJlY2F1c2Ugb2YgcmVhc29ucyBvZiBzZWN1cml0eSwgcHJpdmFjeSBvciB1c2VyIHByZWZlcmVuY2UuXCI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcImJhZC1ncmFtbWFyXCI6IHtcclxuICAgICAgICBtZXNzYWdlID0gXCJUaGVyZSB3YXMgYW4gZXJyb3IgaW4gdGhlIHNwZWVjaCByZWNvZ25pdGlvbiBncmFtbWFyIG9yIHNlbWFudGljIHRhZ3MsIG9yIHRoZSBncmFtbWFyIGZvcm1hdCBvciBzZW1hbnRpYyB0YWcgZm9ybWF0IGlzIHVuc3VwcG9ydGVkLlwiO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJsYW5ndWFnZS1ub3Qtc3VwcG9ydGVkXCI6IHtcclxuICAgICAgICBtZXNzYWdlID0gYFRoZSBsYW5ndWFnZSBbJHt0aGlzLnJlY29nbml0aW9uLmxhbmd9XSB3YXMgbm90IHN1cHBvcnRlZC5gO1xyXG4gICAgICAgIHRoaXMucmVjb2duaXRpb24ubGFuZyA9IFwiZW4tVVNcIjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5ub3RpZnkud2FybmluZyhtZXNzYWdlKTtcclxuICAgIHRoaXMuaWdub3JlX29uZW5kID0gdHJ1ZTtcclxuICAgIHRoaXMuc3RhcnRlZC5uZXh0KGZhbHNlKTtcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgbW9kdWxlIFZvaWNlUmVjb2duaXRpb25TZXJ2aWNlIHt9Il19