sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    'use strict';
    //inherit from SAP stanard class UIComponent using extend keyword
    return UIComponent.extend("nvidia.sd.sales.Component",{
        metadata: {
            manifest: "json"
        },
        init: function(){
            //this is the constructor of Component class
            //We want to call base class constructor in this child class
            //super->constructor().
            UIComponent.prototype.init.apply(this);
            //Step 1: Get Router object from Base Class
            var oRouter = this.getRouter();
            //Step 2: Call the initialize method
            oRouter.initialize();
        },
        // createContent: function(){
        //     //this is where we create view object - ROOT view - App.view.xml
        //     var oView = new sap.ui.view({
        //         viewName: "nvidia.sd.sales.view.App",
        //         type: "XML",
        //         id:"idRootView"
        //     });

        //     //View 1 object
        //     var oView1 = new sap.ui.view({
        //         viewName: "nvidia.sd.sales.view.View1",
        //         type: "XML",
        //         id:"idView1"
        //     });
        //     //View 2 Object
        //     var oView2 = new sap.ui.view({
        //         viewName: "nvidia.sd.sales.view.View2",
        //         type: "XML",
        //         id:"idView2"
        //     });

        //     //From Root view get app container control object
        //     var oAppCon = oView.byId("appCon");

        //     //Inside this App container we have pages aggregation
        //     oAppCon.addMasterPage(oView1).addDetailPage(oView2);

        //     return oView;
        // },
        destroy: function(){
            //Clean up code
        }
    });
});