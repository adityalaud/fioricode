sap.ui.define([
    'nvidia/sd/sales/controller/BaseController',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageBox',
    'sap/m/MessageToast'
], function (BaseController, JSONModel, MessageBox, MessageToast) {
    'use strict';
    return BaseController.extend("nvidia.sd.sales.controller.Add", {
        onClear: function () {
            this.oLocalModel.setProperty("/productData", {
                "PRODUCT_ID": "",
                "TYPE_CODE": "",
                "CATEGORY": "",
                "NAME": "",
                "DESCRIPTION": "",
                "SUPPLIER_ID": "",
                "SUPPLIER_NAME": "",
                "TAX_TARIF_CODE": "",
                "MEASURE_UNIT": "",
                "PRICE": "0.00",
                "CURRENCY_CODE": "",
                "DIM_UNIT": ""
            });
        },
        onInit: function () {
            var oJSONModel = new JSONModel();
            oJSONModel.setData({
                "productData": {
                    "PRODUCT_ID": "",
                    "TYPE_CODE": "PR",
                    "CATEGORY": "Notebooks",
                    "NAME": "",
                    "DESCRIPTION": "",
                    "SUPPLIER_ID": "0100000051",
                    "SUPPLIER_NAME": "TECUM",
                    "TAX_TARIF_CODE": "1 ",
                    "MEASURE_UNIT": "EA",
                    "PRICE": "0.00",
                    "CURRENCY_CODE": "USD",
                    "DIM_UNIT": "CM"
                }
            });
            this.getView().setModel(oJSONModel, "local");
            this.oLocalModel = oJSONModel;
        },
        onEnter: function (oEvent) {
            debugger;
            var oDataModel = this.getView().getModel();
            var sProductId = oEvent.getParameter("value");
            var payload = this.oLocalModel.getProperty("productData");
            var that = this;
            oDataModel.read("/ProductSet('" + sProductId + "')", {
                success: function (oData, response) {
                    that.oLocalModel.setProperty("/productData", oData);
                    MessageToast.show("Data read successfully!")
                }
            });



        },
        onSave: function () {
            //Step 1: Read data from the model to prepare payload
            var payload = this.oLocalModel.getProperty("/productData");
            //Step 2: Pre-checks before calling Backend
            if (payload.PRODUCT_ID === "") {
                MessageBox.error("Empty product id not allowed");
                return;
            }
            //Step 3: Get the Default model - OData Model
            var oDataModel = this.getView().getModel();
            //Step 4: Use the OData Model object to send data to backend
            oDataModel.create("/ProductSet", payload, {
                //Step 5: Handle the call back
                success: function () {
                    MessageToast.show("You have made it NVIDIans!");
                },
                error: function (oError) {
                    var JSONError = JSON.parse(oError.responseText);
                    var sText = JSONError.error.innererror.errordetails[0].message
                    MessageBox.error(sText);
                },
                headers: {
                    "flag": "test"
                }
            });

        }
    });
});