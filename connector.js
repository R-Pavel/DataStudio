const cc = DataStudioApp.createCommunityConnector();
const dsTypes = cc.FieldType;
const dsAggregationTypes = cc.AggregationType;

function isAdminUser() {
    return true;
}

/**
 * Returns the Auth Type of this connector.
 * @return {object} The Auth type.
 */
function getAuthType() {
    var cc = DataStudioApp.createCommunityConnector();
    return cc.newAuthTypeResponse()
        .setAuthType(cc.AuthType.NONE)
        .build();
}

function getConfig(request) {
    const config = cc.getConfig();
    return config.build();
}

// https://developers.google.com/datastudio/connector/reference#datatype
function _getField(fields, fieldId) {
    switch (fieldId) {
        case 'spend':
            fields
                .newMetric()
                .setId('spend')
                .setName('Spend')
                .setType(dsTypes.NUMBER);
            break;
        case 'sales':
            fields
                .newMetric()
                .setId('sales')
                .setName('Sales')
                .setType(dsTypes.NUMBER);
            break;
        case 'sku':
            fields
                .newDimension()
                .setId('sku')
                .setName('Sku')
                .setType(dsTypes.TEXT);
            break;
        case 'date':
            fields
                .newDimension()
                .setId('date')
                .setName('Date')
                .setType(dsTypes.YEAR_MONTH_DAY);
            break;
        case 'created':
            fields
                .newDimension()
                .setId('created')
                .setName('Created')
                .setType(dsTypes.YEAR_MONTH_DAY);
            break;
        case 'changed':
            fields
                .newDimension()
                .setId('changed')
                .setName('Changed')
                .setType(dsTypes.YEAR_MONTH_DAY);
            break;
        case 'account-id':
            fields
                .newDimension()
                .setId('account-id')
                .setName('Account id')
                .setType(dsTypes.NUMBER);
            break;
        case 'title':
            fields
                .newMetric()
                .setId('title')
                .setName('Title')
                .setType(dsTypes.TEXT);
            break;
        case 'orders':
            fields
                .newMetric()
                .setId('orders')
                .setName('Orders')
                .setType(dsTypes.NUMBER);
            break;
        case 'impressions':
            fields
                .newMetric()
                .setId('impressions')
                .setName('Impressions')
                .setType(dsTypes.NUMBER);
            break;
        case 'clicks':
            fields
                .newMetric()
                .setId('clicks')
                .setName('Clicks')
                .setType(dsTypes.NUMBER);
            break;
        default:
            throw new Error(`Invalid fieldId: ${fieldId}`)
    }
    return fields;
}

function getSchema(request) {
    let fields = cc.getFields();
    ['spend', 'sales', 'sku', 'date'].forEach(fieldId => {
        fields = _getField(fields, fieldId);
    });
    fields.setDefaultDimension('date');
    return { 'schema': fields.build() };
}

function _getDataField(entity, fieldId) {
    switch (fieldId) {
        case 'spend':
            return entity['spend'];
        case 'sales':
            return entity['sales'];
        case 'sku':
            return entity['sku'];
        case 'date':
            return entity['date'];
        default:
            throw new Error(`Invalid fieldId: ${fieldId}`)
    }
}

function getData(request) {
    let fields = cc.getFields();
    const fieldIds = request.fields.map(field => field.name);
    fieldIds.forEach(fieldId => {
        fields = _getField(fields, fieldId);
    });

    const url = 'https://cbf6-83-96-213-232.ngrok.io/api/kpi_campaigns';
    const httpResponse = UrlFetchApp.fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMzVjYzk5YmI4MzVmNWU4ODdhZDZhNGUyMzAwMTYyNTE0MTZlNTE1MDllNjhiZWU1NjA5NTRjY2RkN2VjZTkxODZlMTkzZGIxMGFiMTc4NjIiLCJpYXQiOjE2MzQwMjQxNzcuMzA2ODY0LCJuYmYiOjE2MzQwMjQxNzcuMzA2ODc0LCJleHAiOjE2NjU1NjAxNzcuMjk2ODMzLCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.XDvH5EyDAJc7eClztPH0Zdu6MykV32p6OCVWK7RcOAw-nt9AlUtPeUlqIABV55M1y7OiBJsg5G2Ps1GlnWa7F6BeVUOy-tPdspEdnHJyF5SV3q9yCZNHAB8alnTr1uyeJSqplDXA0eLeVE2NDMWj1GhnWoIl5EF0dv4M5EnCato4OzfzQwJhYCZElZt53oEzdlqCuXPKw9TbEaxpBS4XTUiBeybnmf5-ma1kDHU0fG-5YC1txm7OOzsWAJ8jTnqsrICzy-dnzJcz53g2hmpt_W3bmFyh5snlwnGeX3sv7Exhel4uN_laXcwyVbWxrir39KmtUWMj0n3wjv6qmZwgclJBrv9Ac7TE8GQ0E1rOa52YxbxiuJhkwvlNxDDetkiGgET-z-_aKg_PVL5HD3yw4mEEUaGdxQhHKAUk2EnCaiDputaT8FtOyeutENFudvL5mbst-hvFxUMa2oxIIZYTQQkW4bSekL16ogvWbY8Macr0Zxt-x-2Y0Hodlf_829f-DzkekrVsZFR8XKsYzQ2WbgR_7FQDrIs1PPTJbQ-F0SvZ7oM0jGAODiuyp2DXmPDOsyIfb-VVGQoCeiDPJX10NS6VHDVMbk5WPzIcYqk3w0gcmqyxxOFPD5nW0TTn2RwFRsR9rpru5Zbrg0Ra6G5lYXNrQ7EferniTS7bquqOnfQ",
        }
    });

    if(httpResponse.getResponseCode() !== 200) {
        Logger.log('An exception occurred accessing the API:');
        Logger.log(httpResponse.getResponseCode());
        Logger.log(httpResponse.getAllHeaders());
        Logger.log(httpResponse.getContentText());
        // TODO: Return an error to the user
        sendUserError(`The API replied with an unsuccessful status code of ${httpResponse.getResponseCode()}`);
        return;
    }

    var json = httpResponse.getContentText();
    const data = JSON.parse(json);

    const rows = data.data.map(dataPoint => {
        return {
            values: fieldIds.map(fieldId => _getDataField(dataPoint, fieldId))
        };
    });

    const result = {
        schema: fields.build(),
        rows: rows
    };
    return result;
}

function sendUserError(message) {
    cc.newUserError()
        .setText(message)
        .throwException();
}

