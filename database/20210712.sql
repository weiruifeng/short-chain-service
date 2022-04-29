CREATE TABLE `inkjet_cinema_appeal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `cinema_id` int(11) NOT NULL,
  `content` json DEFAULT NULL COMMENT '[\n  {\n    periodId: 123, // 时间段ID\n    targetCount: 1, // 实际场次\n    totalCount: 1, // 总场次\n  }\n]',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='此表为BD申诉时的临时表';

CREATE TABLE `inkjet_cinema_compliance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `cinema_id` int(11) NOT NULL,
  `type` tinyint(4) DEFAULT NULL COMMENT '1: 单影院达标\n2: 多影院合并达标',
  `appeal_status` tinyint(4) DEFAULT '1' COMMENT '0: 申诉中\n1: 未操作\n2: 通过\n3: 驳回',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0: 未知\n1: 达标\n2: 未达标',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='此表为影院级别的达标条件设置的规则，BD录入合作条件时设置的数据';

CREATE TABLE `inkjet_cinema_compliance_rules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `cinema_id` int(11) NOT NULL,
  `rule_id` int(11) DEFAULT NULL COMMENT '1: 单影院单日排片比例\n2: 单影院拉通排片比例\n3: 单影院场次',
  `average_ratio` float DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='此表为BD在影院选择单影院达标的达标判断条件';

CREATE TABLE `inkjet_cinema_period_num` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `cinema_id` int(11) NOT NULL,
  `period_id` int(11) NOT NULL,
  `show_num` int(11) DEFAULT NULL COMMENT '场次数',
  `total_show_num` int(11) DEFAULT NULL COMMENT '总场次数',
  `show_rate` float DEFAULT NULL COMMENT '排片率',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='此表为影院在不同时间段内设置的目标比例和场次';

CREATE TABLE `inkjet_cinema_statistics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `cinema_id` int(11) NOT NULL,
  `rule_id` int(11) NOT NULL,
  `period_id` int(11) NOT NULL,
  `target_ratio` float DEFAULT NULL,
  `target_count` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='此表为影院在不同时间段内设置的目标比例和场次';

CREATE TABLE `inkjet_loggers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `cinema_id` int(11) DEFAULT NULL,
  `user_id` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` json DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='此表为操作记录';

CREATE TABLE `inkjet_task_compliance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `movie_id` int(11) DEFAULT NULL,
  `method` tinyint(4) NOT NULL COMMENT '1:系统；2:人工判断',
  `result_date` datetime DEFAULT NULL,
  `market_ratio` float DEFAULT NULL,
  `status` tinyint(4) DEFAULT '1' COMMENT '1: 待确认 2: 已确认',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='此表为每个任务设置达标条件的基础数据';

CREATE TABLE `inkjet_task_compliance_rules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL COMMENT '1: 单影院单日排片比例\n2: 单影院拉通排片比例\n3: 单影院场次',
  `average_ratio` float DEFAULT NULL,
  `content` json DEFAULT NULL COMMENT '{\n  single: [\n    {\n      periodId: 123, // 时间段ID\n      targetRatio: 20, // 目标比例 \n      attachmentName: ''文件名称'', // 上传文件地址\n    },\n  ],\n  averageRatio: 30, // 目标拉通比例\n}',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='此表为达标条件设置的规则';

CREATE TABLE `inkjet_task_period` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `period` tinyint(4) NOT NULL COMMENT '时段,\n1-全时段(6:00~6:00),2-早十晚十场(10:00~22:00),3-黄金场(18:00~21:00),4-白天场(9:00~16:00),5-全天场(9:00~24:00)',
  `date` int(11) NOT NULL,
  `market_ratio` float DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='此表为达标条件设置的时间段';






