/**
 * Created by Administrator on 2017-06-25.
  */

/*
< 아브라함의 이동 >
우르 -> 하란 -> 세겜 -> 벧엘 -> 애굽 -> 네게브 -> 벧엘 -> 헤브론

< 이스라엘의 출애굽 >
라암셋 -> 숙곳 -> 에담 -> 믹돌 -> 비하히롯 -> 바알스본 -> 마라 -> 엘림 -> 신광야
-> 르비딤 -> 시내산 -> 다베라 -> 아브로나 -> 에시온게벨 -> 가데스
-> 호르산 -> 살모나 -> 부논 -> 오봇 -> 이예아바림 -> 느보산 -> 여리고

< 이스라엘 바벨론 포로경로 >

<예수님의 출생여정>
베들레헴 -> 예루살렘 -> 애굽 ->  나사렛

<바울의 회심과 첫사역 여정>
예루살렘 -> 다메섹 -> 아라비아 -> 다메섹 -> 디베랴 -> 예루살렘 -> 가이사랴 -> 다소 -> 안디옥 -> 시돈 -> 두로 -> 예루살렘

<사도바울 1차 전도 >
 안디옥 -> 살라미 -> 바보 -> 버가 -> 비시디아 안디옥 -> 이고니온 -> 루스드라->
 더베 -> 루스드라 -> 이고니온 -> 비시디아 안디옥 -> 앗달리아 -> 안디옥

<사도바울 2차 전도 >
 예루살렘 -> 다메섹 -> 안디옥 -> 다소 -> 더베 -> 루스드라 -> 이고니온 ->
 비시디아 안디옥 -> 북쪽 ->드로아 -> 사모드라게 -> 네압볼리 -> 빌립보 -> 암비볼리
 -> 데살로니가 -> 베뢰아 -> 배타고 -> 아덴 -> 고린도 -> 겐그레아 -> 에베소 ->
 가이사랴 -> 예루살렘

 <사도바울 3차 전도 >
 안디옥 -> 다소 -> 더베 -> 루스드라 -> 이고니온 -> 비시디아 안디옥 ->라오디게아
 -> 에베소 -> 서머나 -> 버가모 -> 드로아 -> 네압볼리 -> 빌립보 -> 암비볼리->
 아볼로니아 -> 데살로니가 -> 베뢰아 -> [배타고] -> 겐그레아 -> 고린도 ->
 베뢰아 -> 데살로니가 -> 아볼로니아 -> 암비몰리 -> 빌립보 -> 네압볼리 ->
 드로아 -> 앗소 -> 미둘레네 -> 기오 -> 밀레도 -> 코스 -> 로도 -> 바다라 ->
 두로 -> 돌레마이 -> 가이사랴 -> 예루살렘

*/



var TrajectoryData = function(){
    this.trajectoryArray = [
        {
            name : "아브라함의 이동",
            value: 0,
            extent: [],
            data:
            [
                [5210885.615684365,3512186.2264693333],     // 아브라함의 이동
                [5088078.87128389,3736585.8846845054],
                [4915025.439246243,3934710.6619996787],
                [4667980.963828558,4042333.997825207],
                [4587187.024931129,4448692.3494462725],
                [4420878.981674294,4390734.569300294],
                [4229350.447115014,4423565.310294834],
                [4128153.0809744583,4259030.336436439],
                [4044625.661733496,4134652.4580438137],
                [3998022.4782936214,4019756.818036398],
                [3926706.730903553,3791826.37700427],
                [3932552.216917588,3774900.1191779524],
                [3915859.696238111,3737853.8650255445],
                [3878442.0612795902,3684025.468511233],
                [3797418.811297304,3630213.800598468],
                [3649742.4726503408,3611868.9138100226],
                [3550068.587766471,3615232.143054572],
                [3469876.590466786,3579067.8740471457],
                [3563955.1734588975,3588870.0061092013],
                [3635347.357877252,3597278.0792205706],
                [3737415.903385136,3597125.205164],
                [3829140.3373273453,3609660.8778027673],
                [3885378.8808881645,3598061.5587604917],
                [3924798.26896427,3655689.0633109],
                [3937028.193489898,3717755.930278462],
                [3932671.282877641,3774844.712804804],
                [3926385.6334381676,3748758.365135364],
                [3911327.5388659877,3717036.9983970094],
                [3906565.432870186,3701653.7357792817]
            ]
        }
        ,
        {
            name : "이스라엘의 출애굽",
            value : 1,
            extent: [],
            data: [
                [3482667.657951628,3514915.6880291747],     // 출애굽
                [3579508.3139143,3523994.5446794597],
                [3603515.4640834033,3518767.9545116816],
                [3617943.1190731195,3505484.383338662],
                [3600130.077172664,3512242.1719399556],
                [3590800.109222771,3450966.5298649943],
                [3621100.2249664403,3422665.720142409],
                [3646035.610116765,3434461.08116137],
                [3678957.7742986297,3433319.846670347],
                [3696189.27252934,3414568.065169159],
                [3737922.2189171882,3383829.300467187],
                [3775485.303411733,3316644.470114777],
                [3782054.8284354745,3317042.867301766],
                [3801893.826808255,3326882.250234237],
                [3820134.5207205103,3358092.437575396],
                [3824874.418855063,3379842.0792827886],
                [3835321.792960953,3432892.4209177624],
                [3830365.3294080845,3487306.367143066],
                [3890010.9919194053,3447592.4702445506],
                [3897282.504520484,3443470.456863854],
                [3872954.617236507,3531253.3978579235],
                [3853337.6963906516,3583814.2246339833],
                [3901967.2840799987,3613784.080249268],
                [3932641.732313744,3590003.770808257],
                [3937539.1122598154,3565647.28289474],
                [3951284.1858464307,3589426.8945948654],
                [3964454.604173657,3605814.6539915456],
                [3975263.2777046105,3628659.7708202796],
                [3973323.9312975383,3735771.189177649],
                [3947321.4946172303,3744473.497759225]
            ]
        },
        {
           name : "이스라엘 바벨론 포로경로",
           value : 2,
            extent: [],
           data :
            [
                [3923471.156773658,3775085.2895391686],     // 바벨론으로 끌려감
                [3926987.260074776,3791289.9395356257],
                [3924082.6529999413,3818960.1437748615],
                [3916978.6015800512,3838352.4087719014],
                [3926842.6807427616,3891339.8734833477],
                [3924702.4439507765,3928946.8913996546],
                [3958028.9882831182,3979089.5819547325],
                [4018430.044037671,4046828.5924246637],
                [4066738.2459139023,4075416.04100332],
                [4091543.837145079,4178518.938844221],
                [4210479.85315682,4267797.387881308],
                [4371914.856895112,4256790.455808243],
                [4497883.079509081,4090463.4822597005],
                [4686223.917203756,4012191.96529568],
                [4884348.694518933,3911906.584185529],
                [5006647.939775215,3828743.097411257],
                [5051503.904991457,3702189.812550994]
        ]},
        {
            name : "예수님의 출생여정",
            value: 3,
            extent: [],
            data : [
                [3918455.1312112426,3725080.4105380476],
                [3922387.1703771767,3734200.9204026773],
                [3890665.7340224157,3707823.6009546337],
                [3870486.3585551293,3672662.5679434524],
                [3813617.209510958,3635972.794366566],
                [3737485.9293389204,3619462.396256967],
                [3648818.976528116,3601117.5094685247],
                [3551591.0765493717,3590722.0736217406],
                [3469879.8933125194,3579098.8680081232],
                [3628240.129290318,3587428.0261115986],
                [3753596.855678007,3601492.439316071],
                [3830033.8839631835,3628398.273272453],
                [3876507.597160571,3658361.588360242],
                [3906470.9122483595,3691382.3845794383],
                [3927873.280168209,3714007.7449518503],
                [3936434.2273361487,3766596.4204120515],
                [3933529.620261311,3813528.755779145],
                [3930217.7471451457,3856400.3740185956]
        ] },
        {
            name : "바울의 회심과 최초사역",
            value: 4,
            extent: [],
            data: [
                        [3922398.516498566,3734177.033831332],
                        [3947307.433091001,3744476.923392761],
                        [3953246.8802512423,3790123.6734858877],
                        [3955692.865156366,3839654.86781468],
                        [3970980.2708134013,3854330.777245434],
                        [3976636.6109065046,3878790.62629669],
                        [3974343.5000579497,3927251.702229494],
                        [4011033.2736348356,3943303.478169385],
                        [4041073.025750909,3963368.1980942427],
                        [4100170.109681445,3932726.661825488],
                        [4128604.5704652327,3907043.9230530346],
                        [4074181.6240188438,3935172.6369466735],
                        [4040931.6218921435,3963301.4181048973],
                        [4023427.542414838,3957262.8928703684],
                        [3993999.286525045,3940676.057732484],
                        [3974431.40728404,3927223.1407542927],
                        [3963730.223324114,3885182.7751974463],
                        [3960290.5570512824,3879908.6202457687],
                        [3953690.0577371675,3876232.1056622956],
                        [3951932.006086611,3870078.9248853405],
                        [3956212.4796705805,3867690.2677514283],
                        [3954779.285390234,3850377.280844839],
                        [3951033.8710042606,3834937.0011312333],
                        [3945814.3522717915,3789996.5169014162],
                        [3936641.908877572,3756669.9725690796],
                        [3922386.403102389,3734229.7556822156],
                        [3898748.2093102452,3749937.8788244682],
                        [3896149.3503485494,3770270.1283483254],
                        [3897200.625878276,3807099.57984121],
                        [3884595.0993191907,3830845.8032728583],
                        [3879430.7812569714,3835809.474135831],
                        [3824778.306033077,3966019.951819637],
                        [3881035.958850966,4263291.879645559],
                        [3855984.015233987,4412133.882973873],
                        [3883558.673187859,4428408.840614256],
                        [3931283.921789753,4439281.766020505],
                        [4010057.3659072644,4442050.154801769],
                        [4048581.628162993,4417284.557637372],
                        [4056836.827217792,4371728.088779408],
                        [4040937.9253344717,4272130.640923828],
                        [4005509.3627242907,4232880.22689939],
                        [4005815.110837431,4187018.0099282847],
                        [4001534.6372534563,4146353.51088057],
                        [4010401.3325345367,4101102.7901357454],
                        [3979520.773107325,4051265.8476938107],
                        [3957201.1608480504,4008919.73402382],
                        [3937136.4409231907,3964777.3501891303],
                        [3927734.6864441144,3941502.2750762934],
                        [3918734.226363537,3930992.1836870825],
                        [3921161.1020115907,3928106.685869316],
                        [3912179.7511880845,3889872.162604942],
                        [3907287.7813778333,3863883.572987982],
                        [3899796.952605887,3822148.955544275],
                        [3898573.960153324,3790504.0258342125],
                        [3899338.3304361757,3766961.421122378],
                        [3901325.6931715906,3751979.7635784834],
                        [3922403.2037212257,3734236.8183877836],
                    ] },
        {
        name : "바울의 1차 전도여정",
        value: 5,
        extent: [],
        data: [
            [4041160.8460960486,4271792.13929958],
            [3982762.956486173,4233115.002987285],
            [3770621.539109203,4198355.264374601],
            [3719620.098276561,4141406.329021495],
            [3673757.881305455,4125201.6790250377],
            [3612226.0735358885,4133533.3151081223],
            [3517750.4171431437,4157916.7757565943],
            [3453229.4139066306,4419414.999955975],
            [3433203.046711997,4524898.904286009],
            [3451242.1853872975,4575194.468897659],
            [3443980.6677002055,4604966.691414735],
            [3515943.482228373,4594993.060081691],
            [3570213.772310848,4579094.158198372],
            [3571569.0718507525,4485526.432667271],
            [3717998.3064853377,4454407.352868927],
            [3698124.679131192,4452649.301218371],
            [3588513.9805702474,4474204.54319479],
            [3572099.1287460066,4486109.6103502065],
            [3579636.474951454,4536493.1869921265],
            [3570120.064929946,4579145.048775261],
            [3513086.722889356,4601035.733989763],
            [3444140.5233761277,4604857.585404019],
            [3448268.122903529,4575735.077627377],
            [3422891.0295128496,4521464.787544905],
            [3418381.2448440227,4423854.702424733],
            [3441923.8495558603,4300408.901744174],
            [3666954.4608274195,4268611.097977541],
            [3902074.7598326225,4283287.007408299],
            [3989050.5433926135,4263031.19491273],
            [3996228.705069214,4250388.288061968],
            [4041059.022158468,4272153.7318661725]
    ] },
        {
            name: "바울의 2차 전도여정",
            value: 6,
            extent : [],
            data:
            [
                [3922368.218239543,3734196.2688943828],
                [3938237.4095308864,3771826.729972067],
                [3942517.8831148576,3840314.3073155866],
                [3949550.089717094,3880978.8063633004],
                [3985781.241124267,3923019.1719201514],
                [4041019.021173338,3963348.1659212187],
                [4036338.115004351,4131599.083750432],
                [4041077.2107580327,4272128.560252726],
                [4054936.630189044,4378908.065779674],
                [4043929.6981159784,4432108.2374661565],
                [4009074.413217938,4444949.658218066],
                [3931873.014649913,4434095.600201574],
                [3883564.8127736817,4428057.074967046],
                [3868659.5922580734,4436388.711050128],
                [3856582.5417890153,4454274.975668859],
                [3844505.4913199577,4462683.048780228],
                [3789776.5790677685,4449077.257745467],
                [3718002.209507986,4454274.975668859],
                [3572163.7790526184,4486166.8606031425],
                [3570037.6761853956,4578804.129318297],
                [3524786.955440567,4569631.685924071],
                [3484581.078562564,4597607.638276445],
                [3443609.3546260935,4604716.281906967],
                [3443870.4735710053,4605208.5970489895],
                [3441577.383832076,4619629.621304456],
                [3424837.6746376217,4628114.131444104],
                [3348094.898239303,4710360.373878952],
                [3280830.313348348,4848558.521018551],
                [3251478.49448684,4876687.347427496],
                [3156085.0831869403,4865680.415354431],
                [3035008.8303832207,4865680.415354431],
                [2967744.2454922656,4866903.407806993],
                [2912442.0555279367,4829105.297319967],
                [2898771.118394941,4854255.323591127],
                [2901828.5995263485,4888193.364149746],
                [2860552.604252348,4932851.697925361],
                [2857667.1064345827,4932928.134953646],
                [2781255.4147757026,5002305.352124917],
                [2779688.455695859,5019858.92169585],
                [2756719.1286961623,5024368.706364676],
                [2749151.862895931,5015215.372227527],
                [2733539.5998686845,5010428.503331168],
                [2695924.016108346,4997693.2152682915],
                [2666725.071303409,4984851.794516382],
                [2648074.436401827,4982558.683667832],
                [2636150.2599893394,4969870.136972493],
                [2620098.4840494525,4968647.14451993],
                [2592428.2798102186,4968800.0185765],
                [2573930.5189652056,4955347.101598309],
                [2553101.428757495,4958404.582729715],
                [2546264.573328493,4963116.177220422],
                [2514161.0214487184,4948669.578874526],
                [2478082.744098116,4938732.76519745],
                [2470324.3857271723,4916757.119565467],
                [2515536.887957853,4904907.908857757],
                [2616026.7697419957,4770793.779490116],
                [2624281.968796795,4735938.494592075],
                [2586980.698993629,4731046.524781824],
                [2566189.827300056,4719122.348369336],
                [2535920.764099126,4699554.46912833],
                [2545398.955606488,4690993.521960391],
                [2591566.9206907344,4677234.856869059],
                [2619695.7470996794,4655832.488949209],
                [2634486.3069698527,4631372.6552069755],
                [2662385.8222939395,4627397.929736147],
                [2683023.819930937,4605842.687759727],
                [2686845.6713451976,4577713.861350788],
                [2683941.0642703595,4543011.450509317],
                [2678131.850120686,4526042.430230008],
                [2657799.600596829,4527112.548626001],
                [2644499.5576752084,4540718.339660762],
                [2639760.4619215275,4555088.500978375],
                [2643830.7336777137,4565005.782478911],
                [2637309.4118883656,4573127.216734206],
                [2636850.7897186545,4579242.17899702],
                [2638303.093256073,4586656.570740682],
                [2631576.6347669773,4588491.059419527],
                [2619576.0213262048,4587650.2521083895],
                [2601995.504820614,4583446.2155527035],
                [2593740.305765815,4580159.423336441],
                [2579064.396335061,4574655.957299908],
                [2563776.990678028,4570757.668857366],
                [2550725.3680983335,4570193.945773763],
                [2555502.6823661546,4564671.370480155],
                [2558770.365325346,4562225.385575029],
                [2559802.2652071957,4560658.426495182],
                [2569318.675228698,4562187.167060892],
                [2582465.844093749,4559817.619184052],
                [2610059.6113046953,4554772.775317238],
                [2630621.1719134077,4547511.257630146],
                [2663234.117809874,4481125.838193379],
                [2753429.811186382,4479597.097627675],
                [2863804.9240579037,4490909.802273733],
                [2910278.637255291,4563066.356974939],
                [3036867.910724078,4573361.469222093],
                [3022332.476049248,4548901.353119076],
                [3018204.8765218486,4538353.043215722],
                [3002305.974638532,4535754.184254026],
                [2997414.004828281,4518785.163974717],
                [2994662.271810015,4488576.203154833],
                [3011784.1661458947,4462893.361651014],
                [3033186.5340657444,4430484.061658098],
                [3061315.360474689,4421311.618263878],
                [3040524.488781121,4401743.739022872],
                [3046027.9548176536,4376672.393745335],
                [3088221.194431071,4361996.48431458],
                [3170161.68875278,4371780.423935084],
                [3276562.032125745,4292897.410744776],
                [3504274.9912629626,4007979.3826301675],
                [3754988.4440383385,3857245.5628517997],
                [3884588.4305469585,3830862.9140750864],
                [3899421.460303833,3805706.584423333],
                [3897892.719738129,3766876.5740544638],
                [3913332.999451735,3743639.7174557685],
                [3922366.900732193,3734200.9387911153]
            ]
        },
        {
            name : "바울의 3차 전도여정",
            value : 7,
            extent : [],
            data :
            [
                [4041011.6956887064,4272229.579654596],
                [4046278.0084961643,4405906.5404944755],
                [4024875.640576315,4446876.78765533],
                [3883580.8189159245,4428406.93922968],
                [3718056.4341643746,4454548.402903201],
                [3572176.365682113,4486155.114099119],
                [3570304.487675435,4579102.540493902],
                [3511371.538867565,4603371.296974444],
                [3444030.5169483246,4605052.9115967145],
                [3442261.7987330933,4622569.663898189],
                [3421470.9270395255,4625015.648803314],
                [3232098.189463,4561706.680126113],
                [3132921.1452629813,4557559.971341633],
                [3036839.8007085146,4573305.999168377],
                [3021521.975110131,4634755.1730491975],
                [3027483.0986386603,4645562.352589005],
                [3014718.114915035,4692876.873097525],
                [3012119.255953339,4720699.95139333],
                [2996277.681841234,4734248.414656875],
                [3002213.799143088,4800726.086475661],
                [3000264.654921816,4804672.148060884],
                [2982647.9786011754,4808616.150947031],
                [2929428.6976576233,4804144.584792345],
                [2912421.45886417,4829235.039326951],
                [2902905.50118482,4848122.9106338145],
                [2900459.5162796946,4919362.2209955985],
                [2816378.7851660005,4976537.11815291],
                [2781141.315126532,5002602.144798151],
                [2779689.011589114,5019915.131704744],
                [2756696.2694892157,5024430.151463004],
                [2733514.7438084423,5010379.463303775],
                [2668906.3456503954,4985174.353226733],
                [2645210.866881991,4984409.982943881],
                [2625642.9876409844,4957809.897100644],
                [2618171.2681261087,4957102.854589006],
                [2614540.509282563,4959376.85618049],
                [2587078.1750739045,4957775.953548054],
                [2553407.6641142853,4958272.7942319065],
                [2545802.232568985,4963495.374503072],
                [2494398.3310472053,4947711.128162201],
                [2470325.4444516385,4916805.928409616],
                [2515358.945152539,4903785.386040283],
                [2571274.463226351,4851218.36849215],
                [2609187.2292557983,4773558.3477544105],
                [2596345.8085038904,4732588.100593552],
                [2570357.2188869305,4722957.03502962],
                [2561949.145775561,4711644.354843414],
                [2537336.4226677343,4699567.304374356],
                [2551095.087759066,4693146.593998401],
                [2600127.4087429666,4676604.0753577845],
                [2620612.532323394,4652144.226306529],
                [2627415.428153861,4647940.190377016],
                [2625122.3173053055,4643506.842736476],
                [2636052.812350086,4631659.103352273],
                [2667169.2977571352,4627062.959312686],
                [2683985.4439798743,4604743.347053414],
                [2695838.1963317175,4531800.4736651415],
                [2664040.392565084,4519876.297252654],
                [2622917.27134766,4555190.204320405],
                [2559719.681635692,4560748.757457696],
                [2550726.3532737773,4570238.9796997225],
                [2558911.182919889,4571182.326829395],
                [2571829.040700084,4584864.554892442],
                [2586275.639045982,4590062.272815834],
                [2587880.816639971,4593731.250173523],
                [2586810.6982439784,4604050.248992021],
                [2576950.3215951906,4608330.722575991],
                [2573510.6553223557,4629503.779410995],
                [2540795.6072163,4650600.399217703],
                [2523826.586936991,4670474.026571849],
                [2505787.4482616894,4678117.729400367],
                [2500742.6043948648,4703647.696847608],
                [2486682.4108501105,4808846.146066618],
                [2459874.9523630813,4890234.827847222],
                [2470308.6067240066,4916787.140547776],
                [2504590.613909906,4944256.697587769],
                [2541891.8837130717,4958779.732961952],
                [2550987.8900790084,4962295.836263071],
                [2553343.1060130466,4958497.8714201525],
                [2590778.669827432,4960879.302699671],
                [2614560.112712514,4959398.307736505],
                [2627182.584787222,4957651.295372959],
                [2643769.4199251053,4986926.677206182],
                [2675567.2236917363,4991971.521073004],
                [2733525.6003889716,5010411.954146801],
                [2752492.719021674,5019603.476674539],
                [2756773.192605643,5024495.446484786],
                [2770135.909233302,5020022.974239462],
                [2779690.5377689493,5019898.764068497],
                [2782507.4013999742,5008971.712086222],
                [2781284.4089474115,5002627.438738552],
                [2898920.9954782985,4932387.962511883],
                [2910233.675664505,4918323.549307411],
                [2906903.1548848874,4848110.839876489],
                [2912387.5116643496,4829250.00314712],
                [2931123.465770597,4791925.727431097],
                [2956142.592314637,4749959.440142134],
                [2956320.945380635,4736965.145333654],
                [2972066.9732073843,4730276.905358701],
                [2946689.8798167054,4695115.87234752],
                [2914586.3279369315,4664846.80914659],
                [2907868.148796808,4635019.809417428],
                [2943233.500816252,4547098.504953272],
                [2964635.8687361013,4524473.144580859],
                [3003465.879104971,4492675.340814225],
                [3058760.6593573685,4470451.27484031],
                [3066022.1770444605,4469419.37495846],
                [3072098.920793132,4478706.473895109],
                [3071984.2652507043,4483904.191818502],
                [3072267.183431115,4478639.531751589],
                [3066725.4988804436,4468626.28104624],
                [3054085.8915498867,4466238.4916785145],
                [3025574.879999516,4462110.8921511145],
                [3025039.82080152,4438491.850410995],
                [3035932.0973321586,4422153.435615047],
                [3050273.914017823,4415718.082290385],
                [3038290.0166153507,4392482.913082395],
                [3082011.9967944715,4365424.205069443],
                [3133339.4612879665,4352085.9436336765],
                [3269948.9395934604,4339642.326735923],
                [3378607.854934953,4175686.0002970165],
                [3558387.745461688,4019142.9663689756],
                [3804209.228426815,3955547.358835709],
                [3918722.949988544,3931011.0727561675],
                [3922350.3529408,3929230.1364708394],
                [3919139.997752823,3913484.108644093],
                [3904349.4327796367,3885355.2822351446],
                [3906164.8122014096,3883960.3064689427],
                [3904133.7182080653,3871408.5338579644],
                [3908032.006650606,3850694.0991926794],
                [3884833.3685660576,3830782.2533243927],
                [3897292.968518226,3813584.3591702324],
                [3894617.6725282464,3779799.1926681846],
                [3896071.6211349363,3756437.598594573],
                [3904403.257218021,3742373.1853900994],
                [3922356.4042365,3734184.8687350545]
            ]
        }
    ];

    function calculateExtent( geometry ){

        var maxX = -90000000;
        var maxY = -90000000;
        var minX = 90000000;
        var minY = 90000000;
        for( idx in geometry ){
            var pos = geometry[idx];
            if( pos[0] > maxX )
                maxX = pos[0];
            if( pos[1] > maxY )
                maxY = pos[1];
            if( pos[0] < minX )
                minX = pos[0];
            if( pos[1] < minY )
                minY = pos[1];
        }

        return [ minX, minY, maxX, maxY ];
    }


    for( var arrIdx in this.trajectoryArray ){
        var extent = calculateExtent( this.trajectoryArray[arrIdx].data );
        this.trajectoryArray[arrIdx].extent = extent;
    }

    this.getTrajectoryByValue = function( value ){
        return this.trajectoryArray[ value ];
    };

    this.getCount = function(){
        return this.trajectoryArray.length;
    };

    this.getExtent = function( order ){
        /*
        var array = this.trajectoryArray[ order ].data;
        var maxX = -90000000;
        var maxY = -90000000;
        var minX = 90000000;
        var minY = 90000000;
        for( idx in array ){
            var pos = array[idx];
            if( pos[0] > maxX )
                maxX = pos[0];
            if( pos[1] > maxY )
                maxY = pos[1];
            if( pos[0] < minX )
                minX = pos[0];
            if( pos[1] < minY )
                minY = pos[1];
        }

        return [ minX, minY, maxX, maxY ]; */
        return   this.trajectoryArray[order].extent;
    };



};

