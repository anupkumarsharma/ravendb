/// <reference path="../../typings/tsd.d.ts" />

class genUtils {
    
    static formatAsCommaSeperatedString(input: number, digitsAfterDecimalPoint: number) {
        var parts = input.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        if (parts.length == 2 && parts[1].length > digitsAfterDecimalPoint) {
            parts[1] = parts[1].substring(0, digitsAfterDecimalPoint);
        }
        return parts.join(".");
    }

    static timeSpanAsAgo(input: string, withSuffix: boolean): string {
        if (!input) {
            return null;
        }

        return moment.duration("-" + input).humanize(withSuffix);
    }

    static formatDuration(duration: moment.Duration) {
        let timeStr = "";
        if (duration.asHours() > 0) {
            timeStr = duration.asHours() + " h ";
        }
        if (duration.minutes() > 0) {
            timeStr += duration.minutes() + " m ";
        }
        if (duration.seconds() > 0) {
            timeStr += duration.seconds() + " s ";
        }
        if (duration.milliseconds() > 0) {
            const millis = duration.milliseconds();

            timeStr = Math.floor(millis * 100) / 100 + " ms ";
        }
        return timeStr;
    }

    static formatMillis(input: number) {
        return genUtils.formatDuration(moment.duration({
            milliseconds: input
        }));
    }

    static formatTimeSpan(input: string) {
        return genUtils.formatDuration(moment.duration(input));
    }

    static formatBytesToSize(bytes: number) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return 'n/a';
        var i = Math.floor(Math.log(bytes) / Math.log(1024));

        if (i < 0) {
            // number < 1
            return genUtils.formatAsCommaSeperatedString(bytes, 4) + ' Bytes';
        }

        var res = bytes / Math.pow(1024, i);
        var newRes = genUtils.formatAsCommaSeperatedString(res, 2);

        return newRes + ' ' + sizes[i];
    }

    // replace characters with their char codes, but leave A-Za-z0-9 and - in place. 
    static escape(input: string) {
        var output = "";
        for (var i = 0; i < input.length; i++) {
            var ch = input.charCodeAt(i);
            if (ch == 0x2F) {
                output += '-';
            } else if (ch >= 0x30 && ch <= 0x39 || ch >= 0x41 && ch <= 0x5A || ch >= 0x61 && ch <= 0x7A || ch == 0x2D) {
                output += input[i];
            } else {
                output += ch;
            }
        }
        return output;
    }

    // Return the inputNumber as a string with separating commas rounded to 'n' decimal digits
    // (e.g. for n==2: 2046430.45756 => "2,046,430.46")
    static formatNumberToStringFixed(inputNumber: number, n: number) :string {
        return inputNumber.toLocaleString(undefined, { minimumFractionDigits: n, maximumFractionDigits: n });
    }; 
} 
export = genUtils;
