/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.dto;

import com.stripe.model.Charge;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author dorara
 */
@Getter
@Setter
public class ChargeDTO {

    private String id;
    private Long amount;

    public ChargeDTO(Charge charge) {
        this.id = charge.getId();
        this.amount = charge.getAmount();
    }
}
