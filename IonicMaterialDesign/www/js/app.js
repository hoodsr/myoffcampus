//
//Welcome to app.js
//This is main application config of project. You can change a setting of :
//  - Global Variable
//  - Theme setting
//  - Icon setting
//  - Register View
//  - Spinner setting
//  - Custom style
//
//Global variable use for setting color, start page, message, oAuth key.
var db = null; //Use for SQLite database.
window.globalVariable = {
    //custom color style variable
    color: {
        appPrimaryColor: "",
        dropboxColor: "#017EE6",
        facebookColor: "#3C5C99",
        foursquareColor: "#F94777",
        googlePlusColor: "#D73D32",
        instagramColor: "#517FA4",
        wordpressColor: "#0087BE"
    }, // End custom color style variable
    startPage: {
        url: "/app/login", //Url of start page.
        state: "app.login" //State name of start page.
    },
    parse: {
        appKey: "kJGwy3vLLMvSiAmvimlKjxrDzRI9iM6IQUomWN0Y",
        jsKey: "5U3zrORkklyfgJwd6GNmLU2SsjVuVlnzdJI35mpT"
    },
    message: {
        errorMessage: "Technical error please try again later." //Default error message.
    },
    oAuth: {
        dropbox: "your_api_key", //Use for Dropbox API clientID.
        facebook: "your_api_key", //Use for Facebook API appID.
        foursquare: "your_api_key", //Use for Foursquare API clientID.
        instagram: "your_api_key", //Use for Instagram API clientID.
        googlePlus: "your_api_key", //Use for Google API clientID.
    },
    adMob: "your_api_key" //Use for AdMob API clientID.
}; // End Global variable


angular.module('starter', ['ionic', 'ngIOS9UIWebViewPatch', 'starter.controllers', 'starter.services', 'ngMaterial', 'ngMessages', 'ngCordova'])
    .run(function($ionicPlatform, $cordovaSQLite, $rootScope, $ionicHistory, $state, $mdDialog, $mdBottomSheet) {
        Parse.initialize(window.globalVariable.parse.appKey, window.globalVariable.parse.jsKey);
        Parse.serverURL = 'https://parseapi.back4app.com';
        /*FastClick.attach(document.body, {
          excludeNode: '^pac-'
        });*/


        //Create database table of contracts by using sqlite database.
        //Table schema :
        //Column       Type      Primary key
        //  id          Integer     Yes
        //  firstName   Text        No
        //  lastName    Text        No
        //  telephone   Text        No
        //  email       Text        No
        //  note        Text        No
        //  createDate  DateTime    No
        //  age         Integer     No
        //  isEnable    Boolean     No

        function initialSQLite() {
            db = window.cordova ? $cordovaSQLite.openDB("contract.db") : window.openDatabase("contract.db", "1.0", "IonicMaterialDesignDB", -1);
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS contracts " +
                "( id           integer primary key   , " +
                "  firstName    text                  , " +
                "  lastName     text                  , " +
                "  telephone    text                  , " +
                "  email        text                  , " +
                "  note         text                  , " +
                "  createDate   dateTime              , " +
                "  age          integer               , " +
                "  isEnable     Boolean)                ");
        };
        // End creating SQLite database table.

        // Create custom defaultStyle.
        function getDefaultStyle() {
            return "" +
                ".material-background-nav-bar { " +
                "   background-color        : " + appPrimaryColor + " !important; " +
                "   border-style            : none;" +
                "}" +
                ".md-primary-color {" +
                "   color                     : " + appPrimaryColor + " !important;" +
                "}";
        } // End create custom defaultStyle

        // Create custom style for product view.
        function getProductStyle() {
            return "" +
                ".material-background-nav-bar { " +
                "   background-color        : " + appPrimaryColor + " !important;" +
                "   border-style            : none;" +
                "   background-image        : url('img/background_cover_pixels.png') !important;" +
                "   background-size         : initial !important;" +
                "}" +
                ".md-primary-color {" +
                "   color                     : " + appPrimaryColor + " !important;" +
                "}";
        } // End create custom style for product view.

        // Create custom style for contract us view.
        function getContractUsStyle() {
            return "" +
                ".material-background-nav-bar { " +
                "   background-color        : transparent !important;" +
                "   border-style            : none;" +
                "   background-image        : none !important;" +
                "   background-position-y   : 4px !important;" +
                "   background-size         : initial !important;" +
                "}" +
                ".md-primary-color {" +
                "   color                     : " + appPrimaryColor + " !important;" +
                "}";
        } // End create custom style for contract us view.

        // Create custom style for Social Network view.
        function getSocialNetworkStyle(socialColor) {
            return "" +
                ".material-background-nav-bar {" +
                "   background              : " + socialColor + " !important;" +
                "   border-style            : none;" +
                "} " +
                "md-ink-bar {" +
                "   color                   : " + socialColor + " !important;" +
                "   background              : " + socialColor + " !important;" +
                "}" +
                "md-tab-item {" +
                "   color                   : " + socialColor + " !important;" +
                "}" +
                " md-progress-circular.md-warn .md-inner .md-left .md-half-circle {" +
                "   border-left-color       : " + socialColor + " !important;" +
                "}" +
                " md-progress-circular.md-warn .md-inner .md-left .md-half-circle, md-progress-circular.md-warn .md-inner .md-right .md-half-circle {" +
                "    border-top-color       : " + socialColor + " !important;" +
                "}" +
                " md-progress-circular.md-warn .md-inner .md-gap {" +
                "   border-top-color        : " + socialColor + " !important;" +
                "   border-bottom-color     : " + socialColor + " !important;" +
                "}" +
                "md-progress-circular.md-warn .md-inner .md-right .md-half-circle {" +
                "  border-right-color       : " + socialColor + " !important;" +
                " }" +
                ".spinner-android {" +
                "   stroke                  : " + socialColor + " !important;" +
                "}" +
                ".md-primary-color {" +
                "   color                   : " + socialColor + " !important;" +
                "}" +
                "a.md-button.md-primary, .md-button.md-primary {" +
                "   color                   : " + socialColor + " !important;" +
                "}";
        } // End create custom style for Social Network view.


        function initialRootScope() {
            $rootScope.appPrimaryColor = appPrimaryColor; // Add value of appPrimaryColor to rootScope for use it to base color.
            $rootScope.isAndroid = ionic.Platform.isAndroid(); // Check platform of running device is android or not.
            $rootScope.isIOS = ionic.Platform.isIOS(); // Check platform of running device is ios or not.
        };

        function hideActionControl() {
            //For android if user tap hardware back button, Action and Dialog should be hide.
            $mdBottomSheet.cancel();
            $mdDialog.cancel();
        };


        // createCustomStyle will change a style of view while view changing.
        // Parameter :
        // stateName = name of state that going to change for add style of that page.
        function createCustomStyle(stateName) {
            var customStyle =
                ".material-background {" +
                "   background-color          : " + appPrimaryColor + " !important;" +
                "   border-style              : none;" +
                "}" +
                ".spinner-android {" +
                "   stroke                    : " + appPrimaryColor + " !important;" +
                "}";

            switch (stateName) {
                case "app.welcome":
                case "register":
                case "login":
                case "app.productList":
                case "app.productDetail":
                case "app.productCheckout":
                case "app.clothShop":
                case "app.catalog":
                    customStyle += getProductStyle();
                    break;
                case "app.dropboxLogin":
                case "app.dropboxProfile":
                case "app.dropboxFeed":
                    customStyle += getSocialNetworkStyle(window.globalVariable.color.dropboxColor);
                    break;
                case "app.facebookLogin":
                case "app.facebookProfile":
                case "app.facebookFeed":
                case "app.facebookFriendList":
                    customStyle += getSocialNetworkStyle(window.globalVariable.color.facebookColor);
                    break;
                case "app.foursquareLogin":
                case "app.foursquareProfile":
                case "app.foursquareFeed":
                    customStyle += getSocialNetworkStyle(window.globalVariable.color.foursquareColor);
                    break;
                case "app.googlePlusLogin":
                case "app.googlePlusProfile":
                case "app.googlePlusFeed":
                    customStyle += getSocialNetworkStyle(window.globalVariable.color.googlePlusColor);
                    break;
                case "app.instagramLogin":
                case "app.instagramProfile":
                case "app.instagramFeed":
                    customStyle += getSocialNetworkStyle(window.globalVariable.color.instagramColor);
                    break;
                case "app.wordpressLogin":
                case "app.wordpressFeed":
                case "app.wordpressPost":
                    customStyle += getSocialNetworkStyle(window.globalVariable.color.wordpressColor);
                    break;
                case "app.contractUs":
                    customStyle += getContractUsStyle();
                    break;
                default:
                    customStyle += getDefaultStyle();
                    break;
            }
            return customStyle;
        } // End createCustomStyle


        // Add custom style while initial application.
        $rootScope.customStyle = createCustomStyle(window.globalVariable.startPage.state);

        $ionicPlatform.ready(function() {
            ionic.Platform.isFullScreen = true;
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            

            //initialSQLite();
            initialRootScope();

            //Checking if view is changing it will go to this function.
            $rootScope.$on('$ionicView.beforeEnter', function() {
                //hide Action Control for android back button.
                hideActionControl();
                // Add custom style ti view.
                $rootScope.customStyle = createCustomStyle($ionicHistory.currentStateName());
            });
        });

    })

.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider, $mdColorPalette, $mdIconProvider) {


    // Use for change ionic spinner to android pattern.
    $ionicConfigProvider.spinner.icon("android");
    $ionicConfigProvider.views.swipeBackEnabled(false);

    // mdIconProvider is function of Angular Material.
    // It use for reference .SVG file and improve performance loading.
    $mdIconProvider
        .icon('facebook', 'img/icons/facebook.svg')
        .icon('twitter', 'img/icons/twitter.svg')
        .icon('mail', 'img/icons/mail.svg')
        .icon('message', 'img/icons/message.svg')
        .icon('share-arrow', 'img/icons/share-arrow.svg')
        .icon('more', 'img/icons/more_vert.svg');

    //mdThemingProvider use for change theme color of Ionic Material Design Application.
    /* You can select color from Material Color List configuration :
     * red
     * pink
     * purple
     * purple
     * deep-purple
     * indigo
     * blue
     * light-blue
     * cyan
     * teal
     * green
     * light-green
     * lime
     * yellow
     * amber
     * orange
     * deep-orange
     * brown
     * grey
     * blue-grey
     */
    //Learn more about material color patten: https://www.materialpalette.com/
    //Learn more about material theme: https://material.angularjs.org/latest/#/Theming/01_introduction
    var customPrimary = {
        '50': '#e20000',
        '100': '#c90000',
        '200': '#af0000',
        '300': '#960000',
        '400': '#7c0000',
        '500': '#630000', //usc color
        '600': '#490000',
        '700': '#300000',
        '800': '#160000',
        '900': '#000000',
        'A100': '#fc0000',
        'A200': '#ff1616',
        'A400': '#ff3030',
        'A700': '#000000'
    };

    $mdThemingProvider.definePalette('USC', customPrimary);

    $mdThemingProvider
        .theme('default')
        .primaryPalette('blue')
        .accentPalette('indigo');

    appPrimaryColor = $mdColorPalette[$mdThemingProvider._THEMES.default.colors.primary.name]["500"]
    //appPrimaryColor = '#86000b'; //Use for get base color of theme.

    //$stateProvider is using for add or edit HTML view to navigation bar.
    //
    //Schema :
    //state_name(String)      : Name of state to use in application.
    //page_name(String)       : Name of page to present at localhost url.
    //cache(Bool)             : Cache of view and controller default is true. Change to false if you want page reload when application navigate back to this view.
    //html_file_path(String)  : Path of html file.
    //controller_name(String) : Name of Controller.
    //
    //Learn more about ionNavView at http://ionicframework.com/docs/api/directive/ionNavView/
    //Learn more about  AngularUI Router's at https://github.com/angular-ui/ui-router/wiki
    $stateProvider
        .state('app.login', {
            url: "/login",
            views: {
                'menuContent': {
                    templateUrl: "templates/themes/authentication/html/login.html",
                    controller: 'loginCtrl'
                }
            }
        })

    .state('app.register', {
        url: "/register",
        views: {
            'menuContent': {
                templateUrl: "templates/themes/authentication/html/register.html",
                controller: 'registerCtrl'
            }
        }
    })

    .state('app.password', {
        url: "/password",
        views: {
            'menuContent': {
                templateUrl: "templates/themes/authentication/html/password.html",
                controller: 'passwordCtrl'
            }
        }
    })

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu/html/menu.html",
        controller: 'menuCtrl'
    })


    .state('app.welcome', {
        url: "/welcome",
        views: {
            'menuContent': {
                templateUrl: "templates/themes/welcome/html/welcome.html",
                controller: 'welcomeCtrl'
            }
        }
    })

    .state('app.settings', {
        url: "/settings",
        views: {
            'menuContent': {
                templateUrl: "templates/themes/welcome/html/account-settings.html",
                controller: 'settingsCtrl'
            }
        }
    })

    .state('app.addreview', {
        url: "/addreview",
        cache: false,
        params: {
            propDetail: null,
        },
        views: {
            'menuContent': {
                templateUrl: "templates/reviews/html/add-review.html",
                controller: 'addReviewCtrl' 
            }
        }
    })

    .state('app.addreviewforlandlord', {
        url: "/addreviewforlandlord",
        cache: false,
        params: {
            lordDetail: null,
        },
        views: {
            'menuContent': {
                templateUrl: "templates/reviews/html/add-review-landlord.html",
                controller: 'addReviewLandlordCtrl' 
            }
        }
    })

    .state('app.addlandlord', {
        url: "/addlandlord",
        cache: false,
        params: {
            propDetail: null,
        },
        views: {
            'menuContent': {
                templateUrl: "templates/themes/landlord/html/add-landlord.html",
                controller: 'addLandLordCtrl' 
            }
        }
    })


    .state('app.allreviews', {
        url: "/allreviews",
        cache: false,
        params: {
            propDetail: null, 
            reviews: null,
        },
        views: {
            'menuContent': {
                templateUrl: "templates/reviews/html/all-reviews.html",
                controller: 'allReviewsCtrl' 
            }
        }
    })

    .state('app.allreviewsll', {
        url: "/allreviewsll",
        cache: false,
        params: {
            lordDetail: null, 
            reviews: null,
        },
        views: {
            'menuContent': {
                templateUrl: "templates/reviews/html/all-reviews-landlord.html",
                controller: 'allReviewsLLCtrl' 
            }
        }
    })

    .state('app.addlocation', {
        url: "/addlocation",
        params:{
            lordDetail: null,
        },
        views: {
            'menuContent': {
                templateUrl: "templates/themes/location-feed/html/add_location.html",
                controller: 'addLocationCtrl' 
            }
        }
    })

    .state('app.addlocationfromll', {
        url: "/addlocationfromll",
        params:{
            lordDetail: null,
        },
        views: {
            'menuContent': {
                templateUrl: "templates/themes/landlord/html/add_location.html",
                controller: 'addLocationCtrl' 
            }
        }
    })

    .state('app.addphoto', {
        url: "/addphoto",
        cache: false,
        params: {
            propDetail: null,
        },
        views: {
            'menuContent': {
                templateUrl: "templates/themes/location-feed/html/addPhoto.html",
                controller: 'addPhotoCtrl'
            }
        }
    })

    .state('app.reviewdetail', {
        url: "/reviewdetail",
        params: {
            noteDetail: null,
            actionDelete: false
        },
        views: {
            'menuContent': {
                templateUrl: "templates/application-storage/local-application-db/html/review-detail.html",
                controller: 'noteDetailCtrl' //for right now using the same thing
            }
        }
    })


    .state('app.addproperty', {
        url:"/addproperty",
        params: {
            isAnimated: false
        },
        cache: false,
        views:{
            'menuContent': {
                templateUrl: "templates/themes/location-feed/html/addProperty.html",                    
                controller: 'addLocationCtrl' 
            }
        }
    })

     .state('app.proplist', {
            url: "/proplist",
            params: {
                isAnimated: false
            },
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/themes/property/html/propList.html",
                    controller: 'propListCtrl'
                }
            }
        })



    .state('app.dashboard', {
        url: "/dashboard",
        params: {
            isAnimated: false
        },
        views: {
            'menuContent': {
                templateUrl: "templates/material-user-interface/dashboard/html/dashboard.html",
                controller: 'dashboardCtrl'
            }
        }
    })

    .state('app.dashboardSetting', {
            url: "/dashboardSetting",
            views: {
                'menuContent': {
                    templateUrl: "templates/material-user-interface/dashboard/html/dashboard-setting.html",
                    controller: "dashboardSettingCtrl"
                }
            }
        })
        .state('app.contractlist', {
            url: "/contractlist",
            cache: false,
            params: {
                isAnimated: (ionic.Platform.isAndroid() == false)
            },
            views: {
                'menuContent': {
                    templateUrl: "templates/application-storage/sqLite/html/contract-list.html",
                    controller: 'contractListCtrl'
                }
            }
        })
        .state('app.contractdetail', {
            url: "/contractdetail",
            params: {
                contractdetail: null,
                actionDelete: false
            },
            views: {
                'menuContent': {
                    templateUrl: "templates/application-storage/sqLite/html/contract-detail.html",
                    controller: 'contractDetailCtrl'
                }
            }
        })
        .state('app.contractsetting', {
            url: "/contractsetting",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/application-storage/sqLite/html/contract-setting.html",
                    controller: 'contractSettingCtrl'
                }
            }
        })
        .state('app.notelist', {
            url: "/notelist",
            params: {
                isAnimated: false
            },
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/application-storage/local-application-db/html/note-list.html",
                    controller: 'noteListCtrl'
                }
            }
        })
        .state('app.notedetail', {
            url: "/notedetail",
            params: {
                noteDetail: null,
                actionDelete: false
            },
            views: {
                'menuContent': {
                    templateUrl: "templates/application-storage/local-application-db/html/note-detail.html",
                    controller: 'noteDetailCtrl'
                }
            }
        })
        .state('app.notesetting', {
            url: "/notesetting",
            views: {
                'menuContent': {
                    templateUrl: "templates/application-storage/local-application-db/html/note-setting.html",
                    controller: 'noteSettingCtrl'
                }
            }
        })
        .state('app.facebookLogin', {
            url: "/facebookLogin",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/social-network-connect/facebook/html/facebook-login.html",
                    controller: 'facebookLoginCtrl'
                }
            }
        })
        .state('app.facebookProfile', {
            url: "/facebookProfile",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/social-network-connect/facebook/html/facebook-profile.html",
                    controller: 'facebookProfileCtrl'
                }
            }
        })
        .state('app.facebookFeed', {
            url: "/facebookFeed",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/social-network-connect/facebook/html/facebook-feed.html",
                    controller: 'facebookFeedCtrl'
                }
            }
        })
        .state('app.facebookFriendList', {
            url: "/facebookFriendList",
            cache: false,
            params: {
                access_token: null,
            },
            views: {
                'menuContent': {
                    templateUrl: "templates/social-network-connect/facebook/html/facebook-friend-list.html",
                    controller: 'facebookFriendListCtrl'
                }
            }
        })
        .state('app.googlePlusLogin', {
            url: "/googlePlusLogin",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/social-network-connect/google-plus/html/google-login.html",
                    controller: 'googlePlusLoginCtrl'
                }
            }
        })
        .state('app.googlePlusProfile', {
            url: "/googlePlusProfile",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/social-network-connect/google-plus/html/google-profile.html",
                    controller: 'googlePlusProfileCtrl'
                }
            }
        })
        .state('app.googlePlusFeed', {
            url: "/googlePlusFeed",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/social-network-connect/google-plus/html/google-feed.html",
                    controller: 'googlePlusFeedCtrl'
                }
            }
        })
        .state('app.instagramLogin', {
            url: "/instagramLogin",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/social-network-connect/instagram/html/instagram-login.html",
                    controller: 'instagramLoginCtrl'
                }
            }
        })
        .state('app.instagramProfile', {
            url: "/instagramProfile",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/social-network-connect/instagram/html/instagram-profile.html",
                    controller: 'instagramProfileCtrl'
                }
            }
        })
        .state('app.instagramFeed', {
            url: "/instagramFeed",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/social-network-connect/instagram/html/instagram-feed.html",
                    controller: 'instagramFeedCtrl'
                }
            }
        })
        .state('app.foursquareLogin', {
            url: "/foursquareLogin",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/social-network-connect/foursquare/html/foursquare-login.html",
                    controller: 'foursquareLoginCtrl'
                }
            }
        })
        .state('app.foursquareProfile', {
            url: "/foursquareProfile",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/social-network-connect/foursquare/html/foursquare-profile.html",
                    controller: 'foursquareProfileCtrl'
                }
            }
        })
        .state('app.foursquareFeed', {
            url: "/foursquareFeed",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/social-network-connect/foursquare/html/foursquare-feed.html",
                    controller: 'foursquareFeedCtrl'
                }
            }
        })
        .state('app.dropboxLogin', {
            url: "/dropboxLogin",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/social-network-connect/dropbox/html/dropbox-login.html",
                    controller: 'dropboxLoginCtrl'
                }
            }
        })
        .state('app.dropboxProfile', {
            url: "/dropboxProfile",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/social-network-connect/dropbox/html/dropbox-profile.html",
                    controller: 'dropboxProfileCtrl'
                }
            }
        })
        .state('app.dropboxFeed', {
            url: "/dropboxFeed",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/social-network-connect/dropbox/html/dropbox-feed.html",
                    controller: 'dropboxFeedCtrl'
                }
            }
        })

    .state('app.productList', {
            url: "/productList",
            views: {
                'menuContent': {
                    templateUrl: "templates/share-application-content/social-share/html/product-list.html",
                    controller: 'productListCtrl'
                }
            }
        })
        .state('app.productDetail', {
            url: "/productDetail",
            params: {
                product: null,
            },
            views: {
                'menuContent': {
                    templateUrl: "templates/share-application-content/social-share/html/product-detail.html",
                    controller: 'productDetailCtrl'
                }
            }
        })
        .state('app.productCheckout', {
            url: "/productCheckout",
            views: {
                'menuContent': {
                    templateUrl: "templates/share-application-content/social-share/html/product-checkout.html",
                    controller: 'productCheckoutCtrl'
                }
            }
        })
        .state('app.contractUs', {
            url: "/contractUs",
            views: {
                'menuContent': {
                    templateUrl: "templates/share-application-content/email-message/html/contract-us.html",
                    controller: 'contractUsCtrl'
                }

            }
        })
        .state('app.deviceInformation', {
            url: "/deviceInformation",
            views: {
                'menuContent': {
                    templateUrl: "templates/hardware-connect/device-information/html/device-information.html",
                    controller: 'deviceInformationCtrl'
                }

            }
        })
        .state('app.mobileContractList', {
            url: "/mobileContractList",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/hardware-connect/mobile-contract/html/mobile-contract-list.html",
                    controller: 'mobileContractListCtrl'
                }

            }
        })
        .state('app.mobileContractDetail', {
            url: "/mobileContractDetail",
            params: {
                contractDetail: null,
                actionDelete: false
            },
            views: {
                'menuContent': {
                    templateUrl: "templates/hardware-connect/mobile-contract/html/mobile-contract-detail.html",
                    controller: 'mobileContractDetailCtrl'
                }

            }
        })
        .state('app.flashLight', {
            url: "/flashLight",
            views: {
                'menuContent': {
                    templateUrl: "templates/hardware-connect/flash-light/html/flash-light.html",
                    controller: 'flashLightCtrl'
                }

            }
        })
        .state('app.vibration', {
            url: "/vibration",
            views: {
                'menuContent': {
                    templateUrl: "templates/hardware-connect/vibration/html/vibration.html",
                    controller: 'vibrationCtrl'
                }

            }
        })
        .state('app.googleAdmob', {
            url: "/googleAdmob",
            views: {
                'menuContent': {
                    templateUrl: "templates/advertising-application/googleAdmob/html/googleAdmob.html",
                    controller: 'googleAdmobCtrl'
                }

            }
        })
        .state('app.imagePicker', {
            url: "/imagePicker",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/hardware-connect/image-picker/html/image-picker.html",
                    controller: 'imagePickerCtrl'
                }

            }
        })

    .state('app.wordpressFeed', {
            url: "/wordpressFeed",
            params: {
                wordpressUrl: null
            },
            views: {
                'menuContent': {
                    templateUrl: "templates/social-network-connect/wordpress/html/wordpress-feed.html",
                    controller: 'wordpressFeedCtrl'
                }

            }
        })
        .state('app.wordpressLogin', {
            url: "/wordpressLogin",
            cache: false,
            params: {
                isShowError: false
            },
            views: {
                'menuContent': {
                    templateUrl: "templates/social-network-connect/wordpress/html/wordpress-login.html",
                    controller: 'wordpressLoginCtrl'
                }

            }
        })
        .state('app.wordpressPost', {
            url: "/wordpressPost",
            cache: false,
            params: {
                postDetail: null,
                wordpressUrl: null
            },
            views: {
                'menuContent': {
                    templateUrl: "templates/social-network-connect/wordpress/html/wordpress-post.html",
                    controller: 'wordpressPostCtrl'
                }

            }
        })
        .state('app.defaultUI', {
            url: "/defaultUI",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/material-user-interface/default-user-interface/html/default-user-interface.html",
                    controller: 'defaultUserInterfaceCtrl'
                }

            }
        })
        .state('app.tryApp', {
            url: "/tryApp",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/themes/try-app/html/try-app.html"
                }
            }
        })
        /*
        .state('app.tryAppNoBackBtn', {
            url: "/tryAppNoBackBtn",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/themes/try-app/html/try-app-no-back-btn.html"
                }
            }
        })*/
        .state('app.pricing', {
            url: "/pricing",
            views: {
                'menuContent': {
                    templateUrl: "templates/themes/pricing/html/pricing.html"
                }
            }
        })
        .state('app.menuDashboard', {
            url: "/menuDashboard",
            views: {
                'menuContent': {
                    templateUrl: "templates/themes/menu-dashboard/html/menu-dashboard.html",
                    controller: "menuDashboardCtrl"
                }
            }
        })
        .state('app.expense', {
            url: "/expense",
            params: {
                isAnimated: true
            },
            views: {
                'menuContent': {
                    templateUrl: "templates/themes/expense-dashboard/html/expense-dashboard.html",
                    controller: "expenseDashboardCtrl"
                }
            }
        })
        .state('app.expenseSetting', {
            url: "/expenseSetting",
            views: {
                'menuContent': {
                    templateUrl: "templates/themes/expense-dashboard/html/expense-dashboard-setting.html",
                    controller: "expenseDashboardSettingCtrl"
                }
            }
        })
        .state('app.newsFeed', {
            url: "/newsFeed",
            views: {
                'menuContent': {
                    templateUrl: "templates/themes/news-feed/html/news-feed.html"
                }
            }
        })
        .state('app.clothShop', {
            url: "/clothShop",
            views: {
                'menuContent': {
                    templateUrl: "templates/themes/cloth-shop/html/cloth-shop.html"
                }
            }
        })
        .state('app.onlineCourse', {
            url: "/onlineCourse",
            views: {
                'menuContent': {
                    templateUrl: "templates/themes/online-course/html/online-course.html"
                }
            }
        })
        .state('app.catalog', {
            url: "/catalog",
            views: {
                'menuContent': {
                    templateUrl: "templates/themes/catalog/html/catalog.html",
                    controller: "catalogCtrl"
                }
            }
        })
        .state('app.locationFeed', {
            url: "/locationFeed",
             params: {
                searchResults: null,
            },
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/themes/location-feed/html/location-feed.html",
                    controller: "locationFeedCtrl"
                }
            }
        })
        .state('app.landlordFeed', {
            url: "/landlordFeed",
             params: {
                searchResults: null,
            },
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/themes/landlord/html/landlordList.html",
                    controller: "landlordListCtrl"
                }
            }
        })
        .state('app.cubeFeed', {
            url: "/cubeFeed",
            views: {
                'menuContent': {
                    templateUrl: "templates/themes/cube-feed/html/cube-feed.html"
                }
            }
        })
        .state('app.restaurant', {
            url: "/restaurant",
            views: {
                'menuContent': {
                    templateUrl: "templates/themes/restaurant/html/restaurant.html"
                }
            }
        })
        .state('app.locationDetails', {
            url: "/locationDetails",
            cache: false,
            params: {
                propDetail: null,
                reviews: null,
            },
            views: {
                'menuContent': {
                    templateUrl: "templates/themes/location-feed/html/location_details.html",
                    controller: "locationDetailCtrl"
                }
            }
        })
        .state('app.landLordDetails', {
            url: "/landLordDetails",
            cache: false,
            params: {
                lordDetail: null,
                reviews: null,
            },
            views: {
                'menuContent': {
                    templateUrl: "templates/themes/landlord/html/landlord_details.html",
                    controller: "landLordDetailCtrl"
                }
            }
        })
        .state('app.savedlocations', {
            url: "/savedlocations",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/themes/location-feed/html/saved_location.html",
                    controller: "savedLocationCtrl"
                }
            }
        })
        .state('app.savedlandlords', {
            url: "/savedlandlords",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/themes/landlord/html/saved_landlord.html",
                    controller: "savedLandlordCtrl"
                }
            }
        })
        .state('app.singlePushNotification', {
            url: "/singlePushNotification",
            views: {
                'menuContent': {
                    templateUrl: "templates/push-notification/single-push-notification/html/single-push-notification.html",
                    controller: "singlePushNotificationCtrl"
                }
            }
        })
        .state('app.schedulePushNotification', {
            url: "/schedulePushNotification",
            views: {
                'menuContent': {
                    templateUrl: "templates/push-notification/schedule-push-notification/html/schedule-push-notification.html",
                    controller: "schedulePushNotificationCtrl"
                }
            }
        })
        .state('app.iosMapConnect', {
            url: "/iosMapConnect",
            views: {
                'menuContent': {
                    templateUrl: "templates/map-and-location/ios-map-connect/html/ios-map-connect.html",
                    controller: "iosMapConnectCtrl"
                }
            }
        })
        .state('app.androidMapConnect', {
            url: "/androidMapConnect",
            views: {
                'menuContent': {
                    templateUrl: "templates/map-and-location/android-map-connect/html/android-map-connect.html",
                    controller: "androidMapConnectCtrl"
                }
            }
        }); // End $stateProvider

    //Use $urlRouterProvider.otherwise(Url);
    $urlRouterProvider.otherwise(window.globalVariable.startPage.url);

});
