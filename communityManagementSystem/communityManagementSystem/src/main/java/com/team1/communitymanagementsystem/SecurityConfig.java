package com.team1.communitymanagementsystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;

//https://docs.spring.io/spring-security/site/docs/5.5.5/reference/html5/

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .formLogin()
                //.defaultSuccessUrl("/announcements")
                .failureForwardUrl("/login?error=true");
        http
                .authorizeRequests()
                .antMatchers("/announcements/create","/announcements/*/delete","announcements/*/edit").hasAuthority("ADMIN")
                .antMatchers("/announcements","/announcements/*").hasAnyAuthority("RESIDENT","ADMIN")
                .antMatchers("/discussion","/discussion/*","/discussion/*/delete").hasAnyAuthority("RESIDENT","ADMIN")
                .antMatchers("/discussion/yourPosts","/discussion/post","/discussion/*/edit","discussion/*/comment").hasAuthority("RESIDENT")
                .antMatchers("/myreservations","/reserve").hasAuthority("RESIDENT")
                .antMatchers("/deletereservations","messages/*/delete").hasAnyAuthority("RESIDENT","ADMIN")
                .antMatchers("/sendMessage","/messages").hasAuthority("RESIDENT")
                .antMatchers("/allMessages","/allMessages/*/read").hasAuthority("ADMIN")


                //.antMatchers().hasAuthority("RESIDENT")
                .anyRequest().permitAll();
        http.logout()
                .logoutSuccessUrl("/");
        //Need to be modified after deciding the certain url pattern
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

        auth
                .jdbcAuthentication()
                .dataSource(dataSource)
                .passwordEncoder(passwordEncoder)
                //.withUser(User.withUsername("user"))
                .usersByUsernameQuery("SELECT email, password, enabled FROM users WHERE email=?")
                .authoritiesByUsernameQuery("SELECT email, authorities FROM authorities WHERE email=?");

    }

}
