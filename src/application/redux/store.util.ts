import { CONTENT_TYPE_APPLICATION_JSON } from '@src/application/models/constants/common.constants';
import { HeadersEnum } from '@src/application/models/enums/common.enum';
import { v4 as uuidv4 } from 'uuid';

export function setCommonHeaders(headers: Headers) {
    headers.set(HeadersEnum.ContentType, CONTENT_TYPE_APPLICATION_JSON);
    headers.set(HeadersEnum.XRequestId, uuidv4());
    return headers;
}

export function getResponseHeader(
    action: any,
    headerName: string
): any | undefined {
    if (action.meta?.baseQueryMeta?.response?.headers) {
        const responseHeaders = action.meta.baseQueryMeta.response.headers;
        return [...responseHeaders].find(
            ([header]) => header === headerName
        )?.[1];
    }
}

export function logRequestError(action: any) {
    const meta = action.meta;
    if (!meta) {
        console.error("Action doesn't contain 'meta'", action);
        return;
    }

    const baseQueryMeta = meta.baseQueryMeta;
    const request = baseQueryMeta?.request;
    const response = baseQueryMeta?.response;
    if (!request || !response) {
        console.error(
            `Request/response information haven't been presented in baseQueryMeta. baseQueryMeta: ${baseQueryMeta}`
        );
        return;
    }

    const { method, url } = request;
    const { status, statusText } = response;
    const requestHeaders = request.headers || [];

    const xRequestId = [...requestHeaders].find(
        ([header]) => header === HeadersEnum.XRequestId
    )?.[1];

    // eslint-disable-next-line no-console
    console.group(`ERROR: ${method} ${url}`);
    // eslint-disable-next-line no-console
    console.log(`STATUS: ${status}`);
    // eslint-disable-next-line no-console
    console.log(`STATUS-TEXT: ${statusText}`);
    // eslint-disable-next-line no-console
    console.log(`X-REQUEST-ID: ${xRequestId}`);

    if (meta.arg) {
        // eslint-disable-next-line no-console
        console.log(`RTK QUERY: ${meta.arg.type} ${meta.arg.endpointName}`);
    }

    if (action.payload) {
        // eslint-disable-next-line no-console
        console.groupCollapsed('PAYLOAD');
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(action.payload, undefined, 4));
        // eslint-disable-next-line no-console
        console.groupEnd();
    }

    // eslint-disable-next-line no-console
    console.groupEnd();
}
