import { connect } from "react-redux";
import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useHistory, useParams } from "react-router-dom";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 6,
    },
};
const checkboxLayout = {
    wrapperCol: {
        offset: 4,
        span: 12,
    },
};
const buttonLayout = {
    wrapperCol: {
        offset: 4,
        span: 12,
    },
};

export default function SeatsFormView() {
    const [isChecked, setIsChecked] = useState(true);
    const history = useHistory();
    const getPlaces = (data) => {
        history.push(`/chooseSeat/${data.seatsCount}/${isChecked}`);
    };

    return (
        <div style={{ width: "40%", margin: "auto", marginTop: "30vh" }}>
            <Form {...layout} onFinish={getPlaces}>
                <Form.Item
                    label="Liczba miejsc"
                    name="seatsCount"
                    rules={[
                        {
                            pattern: new RegExp("^[1-5]?$"),
                            message: "Wybierz liczbę(!) od 1 do 5",
                        },
                        {
                            required: true,
                            message: "Liczba miejsc jest wymagana",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item {...checkboxLayout} name="seatsTogether">
                    <Checkbox
                        checked={isChecked}
                        onClick={() => setIsChecked(!isChecked)}
                    >
                        Czy miejsca mają być obok siebie?
                    </Checkbox>
                </Form.Item>
                <Form.Item {...buttonLayout}>
                    <Button
                        style={{
                            border: "1px solid black",
                            width: "80%",
                            height: "3.5em",
                        }}
                        htmlType="submit"
                    >
                        Wybierz miejsca
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
