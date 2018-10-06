package com.fred.controller;

import com.fred.mapper.mysql.UserMapper;
import com.fred.model.po.mysql.UserDomain;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TestController {
    @Autowired
    private UserMapper userMapper;

    @RequestMapping(value = "/hello")
    public String hello() {
        return "hello world!";
    }

    @RequestMapping(value = "/helloMybatis")
    public String helloMybatis() {
        UserDomain user = userMapper.findByUsername("fred");
        System.out.println(user.getUsername());

        List<UserDomain> users = userMapper.findLimit(1);
        if (users.size() > 0) {
            System.out.println(users.get(0).getUsername());
        }

        return user.getUsername();
    }
}
