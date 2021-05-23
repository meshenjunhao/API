CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `subtitle` text NOT NULL,
  `description` text NOT NULL,
  `keywords` text NOT NULL,
  `sort` text NOT NULL,
  `close` text NOT NULL,
  `logo` text NOT NULL,
  `qq` varchar(10) NOT NULL,
  `qun` text NOT NULL,
  `mail` text NOT NULL,
  `user` text NOT NULL,
  `pass` text NOT NULL,
  `date` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
INSERT INTO `admin` (`id`, `name`, `subtitle`, `description`, `keywords`, `sort`, `close`, `logo`, `qq`, `qun`, `mail`, `user`, `pass`, `date`) VALUES
(1, '小杰API', '免费接口调用服务平台', '小杰API是小杰免费提供API数据接口调用服务平台 - 我们致力于为用户提供稳定、快速的免费API数据接口服务。', '小杰API,小杰API-免费接口调用平台,免费接口调用平台,API,免费API,聚合数据,在线API,API接口,免费api接口平台,免费接口调用平台,机器人API,qr,sq,免费,机器人,小杰,QQapi,skey科技,扫码获取skey', 'true', '', '/home/images/logo.png', '2772655946', 'https://jq.qq.com/?_wv=1027&k=ppCuJnk7', 'xiaojieapi@vip.qq.com', 'admin', '$2y$10$zHbdXfHJAteHoCVjVe282OJ.g8CZo5xFjZ/4Jt/yxdCQn/Gbu1EzG', '2019-10-01');
CREATE TABLE IF NOT EXISTS `api` (
  `id` int(10) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `keywords` text NOT NULL,
  `url` text NOT NULL,
  `status` text NOT NULL,
  `inform` text NOT NULL,
  `contents` text NOT NULL,
  `appid` text NOT NULL,
  `request_format` text NOT NULL,
  `return_format` text NOT NULL,
  `add_time` int(128) NOT NULL,
  `update_time` int(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `apicall` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `json` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `request_parameter` (
  `id` int(11) NOT NULL,
  `appid` text NOT NULL,
  `name` text NOT NULL,
  `type` text NOT NULL,
  `explanation` text NOT NULL,
  `required` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `return_parameter` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `type` text NOT NULL,
  `explanation` text NOT NULL,
  `appid` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `skimpv` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `json` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `status_code_binding` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `appid` text NOT NULL,
  `type` text NOT NULL,
  `explanation` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `system` (
  `id` int(11) NOT NULL,
  `api` text NOT NULL COMMENT '。',
  `user` text NOT NULL,
  `link` text NOT NULL,
  `review` text NOT NULL,
  `apicall` text NOT NULL,
  `normal` text NOT NULL,
  `anomaly` text NOT NULL,
  `spider` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
INSERT INTO `system` (`id`, `api`, `user`, `link`, `review`, `apicall`, `normal`, `anomaly`, `spider`) VALUES
(1, '0', '0', '0', '0', '0', '0', '0', '0');
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `api`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `apicall`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `request_parameter`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `return_parameter`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `skimpv`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `status_code_binding`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `system`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
ALTER TABLE `api`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
ALTER TABLE `apicall`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `request_parameter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `return_parameter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `skimpv`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `status_code_binding`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `system`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;