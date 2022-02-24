sap.ui.define([
    'nvidia/sd/sales/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/core/Fragment'
], function(BaseController, MessageBox, MessageToast, Fragment) {
    'use strict';
    return BaseController.extend("nvidia.sd.sales.controller.View2",{
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("detail").attachMatched(this.herculis, this);
        },
        herculis: function(oEvent){
            debugger;
            var sIdex = oEvent.getParameter("arguments").jack;
            var sPath = '/' + sIdex;
            this.getView().bindElement({
                path: sPath,
                parameters:{
                    expand: 'To_Supplier'
                }
            });
        },
        onTableNav: function(oEvent){
            MessageBox.confirm("This functionality is under construction, check back again amigo!");
        },
        onBack: function(){
            //Step 1: Get the control object of parent Container
            var oAppCon = this.getView().getParent();
            //Step 2: Mother is responsible for nav, App Con to API
            oAppCon.to("idView1");

        },
        oSupplierPopup: null,
        oCities: null,
        onFilter: function(){
            //we cannot access global variable (this) inside call backs/promises
            //so we create a local variable which hold the value of global variable
            var that = this;
            if(!this.oSupplierPopup){
                Fragment.load({
                    id: "supplier",
                    controller: this,
                    name: "nvidia.sd.sales.fragments.popup"
                }).then(function(oDialog){
                    that.oSupplierPopup = oDialog;
                    that.oSupplierPopup.setTitle("Suppliers");
                    //Immunity given access to parasite to access body parts
                    that.getView().addDependent(that.oSupplierPopup);
                    //Dynamically loading the data into the items of popup
                    that.oSupplierPopup.bindAggregation("items",{
                        path: "/suppliers",
                        template: new sap.m.DisplayListItem({
                            label: "M/s {name}",
                            value: "{city}"
                        })
                    });
                    that.oSupplierPopup.open();
                });
            }else{
                this.oSupplierPopup.open();
            }

        },
        onConfirm: function(oEvent){
            var oSelectedItem = oEvent.getParameter("selectedItem");
            var sLabel = oSelectedItem.getLabel();
            var sId = oEvent.getSource().getId();
            if(sId.indexOf("supplier") !== -1){
                //Nothing
            }else{
                this.oField.setValue(sLabel);
            }            
        },
        oField: null,
        onF4Help: function(oEvent){
            this.oField = oEvent.getSource();
            var that = this;
            if(!this.oCities){
                Fragment.load({
                    id: "cities",
                    controller: this,
                    name: "nvidia.sd.sales.fragments.popup"
                }).then(function(oDialog){
                    that.oCities = oDialog;
                    that.oCities.setTitle("Cities");
                    that.oCities.setMultiSelect(false);
                    //Immunity given access to parasite to access body parts
                    that.getView().addDependent(that.oCities);
                    //Dynamically loading the data into the items of popup
                    that.oCities.bindAggregation("items",{
                        path: "/cities",
                        template: new sap.m.DisplayListItem({
                            label: "{name}",
                            value: "{famousFor}"
                        })
                    });
                    that.oCities.open();
                });
            }else{
                this.oCities.open();
            }
        },
        confirmOrder: function(){
            MessageBox.confirm("Would you like to order?",{
                onClose: function(state){
                    if(state === "OK"){
                        MessageToast.show("Order XXXX has been placed successfully! 😂");
                    }else{
                        MessageBox.error("Ola! You have just hurt me 😜");
                    }
                }
            });
        },
        onPrintAll: function(oEvent){
            var oBtn = oEvent.getSource();
            debugger;
            var oCombox = this.getView().byId("idMultiC");
            var aItems = oCombox.getSelectedItems();
            for (let index = 0; index < aItems.length; index++) {
                var itm = aItems[index];
                console.log(itm.getText());
            };
        }

    });
});