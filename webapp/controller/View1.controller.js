sap.ui.define([
    'nvidia/sd/sales/controller/BaseController',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "nvidia/sd/sales/util/formatter"
], function(BaseController, Filter, FilterOperator, Formatter) {
    'use strict';
    return BaseController.extend("nvidia.sd.sales.controller.View1",{
        formatter: Formatter,
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        onSelectItem: function(oEvent){
            //Step 1: Get The selected item object
            var oSelectedItem = oEvent.getParameter("listItem");
            //Step 2: get the address of selected item path - PATH of ELEMENT
            var sPath = oSelectedItem.getBindingContextPath();
            ///fruits/3
            //debugger;
            var sIndex = sPath.split("/")[sPath.split("/").length - 1];
            //Step 3: Get The view 2 Object
            // var oMasterSection = this.getView().getParent();
            // var oAppCon = oMasterSection.getParent();
            // var aDetailSection = oAppCon.getDetailPages();
            // var oView2 = aDetailSection[0];
            // //Step 4: Bind the selected element with WHOLE of second view ROW==>SimpleForm
            // oView2.bindElement(sPath);
            this.onNext(sIndex);
        },
        onDeleteAll:function(){
            //Step 1: Get The list Control Object
            var oList = this.getView().byId("idList");
            //Step 2: Get All the items to be deleted - selected by user
            var aSelected = oList.getSelectedItems();
            //Step 3: Loop over each item and perform deletion
            for (let i = 0; i < aSelected.length; i++) {
                const element = aSelected[i];
                oList.removeItem(element);
            }

        },
        onNext: function(sIndex){
            //Step 1: Get the control object of parent Container
            //var oAppCon = this.getView().getParent();
            //Step 2: Mother is responsible for nav, App Con to API
            //oAppCon.to("idView2");
            this.oRouter.navTo("detail",{
                jack: sIndex
            });

        },
        onSender: function(){
            window.open("https://google.com/search?q='joe biden'");
        },
        onSearch: function(oEvent){
            //Step 1: What is the value entered by user in search field
            var sQuery = oEvent.getParameter("query");
            //Step 2: Construct a filter for this value
            var oFilter1 = new Filter("CATEGORY", FilterOperator.Contains, sQuery);
            // var oFilter2 = new Filter("type", FilterOperator.Contains, sQuery);
            // var oFilter = new Filter({
            //     filters: [oFilter1, oFilter2]
            // });
            //Step 3: Inject this filter to the List Control
            var oList = this.getView().byId("idList");
            oList.getBinding("items").filter(oFilter1);
        },
        onAdd: function (params) {
            this.oRouter.navTo("add");
        },
        onDelete: function(oEvent){
            //Step 1: Which item was requested for deletion
            var oListItemToBeDeleted = oEvent.getParameter("listItem");
            //Step 2: Find the list Object
            var oList = oEvent.getSource(); //this.getView().byId("idList");
            //Step 3: Remove THE item from the list
            oList.removeItem(oListItemToBeDeleted);
        }
    });
});