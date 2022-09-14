import { OnDestroy } from "@angular/core";
import { IntlService } from "@sinequa/core/intl";
import { NotificationsService } from "@sinequa/core/notification";
import { Subject } from "rxjs";
import * as i0 from "@angular/core";
export declare class VoiceRecognitionService implements OnDestroy {
    private intlService;
    private notify;
    recognition: any;
    recognizing: boolean;
    ignore_onend: boolean;
    start_timestamp: any;
    text: Subject<string>;
    started: Subject<boolean>;
    available: boolean;
    constructor(intlService: IntlService, notify: NotificationsService);
    init(): void;
    ngOnDestroy(): void;
    start(): void;
    stop(): void;
    toggleRecognition(): void;
    private onResult;
    private onStart;
    private onEnd;
    private onError;
    static ɵfac: i0.ɵɵFactoryDef<VoiceRecognitionService, never>;
    static ɵprov: i0.ɵɵInjectableDef<VoiceRecognitionService>;
}
export declare module VoiceRecognitionService { }
//# sourceMappingURL=voice-recongnition.service.d.ts.map