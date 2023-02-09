package com.team1.communitymanagementsystem.entity;

public enum Categories {
    Activity("ACTIVITY"), Notice("NOTICE"), Alert("ALERT");

    private final String category;

    private Categories(String value) {
        category = value;
    }

    @Override
    public String toString() {
        return category;
    }
}