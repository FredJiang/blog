package com.fred.mapper.mysql;

import com.fred.model.po.mysql.UserDomain;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface UserMapper {
    List<UserDomain> findLimit(@Param("limit") int limit);

    @Select("SELECT username,password FROM users WHERE username=#{username} LIMIT 1")
    UserDomain findByUsername(@Param("username") String username);
}
