import {performance} from "perf_hooks";

export class TimeUtils {

    public static measure(func: any, ...args): any[] {
        let startTime = performance.now()
        let result = func(...args);
        let endTime = performance.now()

        return [result, (endTime - startTime)];
    }

}